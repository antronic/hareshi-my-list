class Observable<T> extends EventTarget {
    #value: T
    // #addEventListener = Symbol('addEventListener')

    constructor(initialData: T) {
        super()
        this.#value = initialData
        // this.#addEventListener = this.addEventListener.bind(this)
    }

    update(param: (p: T) => T | T) {
        if (typeof param !== 'function') {
            this.#value = param
        }

        if (typeof param === 'function') {
            const updater = param

            this.#value = updater(this.#value)
        }

        this.dispatchEvent(new CustomEvent('dataChanged', { detail: this.#value }))
    }

    onChange(callback: Function) {
        if (typeof callback === 'function') {
            // Check callback function parameter
            switch (callback.length) {
                case 1:
                    this.addEventListener('dataChanged', () => callback(this.#value))
                case 2:
                    this.addEventListener('dataChanged', (event) => callback(event, this.#value))
                    break
                default:
                    this.addEventListener('dataChanged', () => callback())
            }
        }
    }

    get() {
        return this.#value
    }

    toString() {
        return JSON.stringify(this.#value)
    }

    toJSON() {
        return this.#value
    }
}

type AnimeType = {
    coverImage: string
    title: string
    animeId: string
    host: string
    path: string
}

type StorageTemplateType = {
    savedList: AnimeType[]
}
type StorageType = {
    savedList: Observable<AnimeType[]>
}

const loadMyList = () => {
    let animeStorage: StorageType | null = null

    function validateStructure(storageStructure: any) {
        if (storageStructure === undefined) {
            return false
        }
        if (!Array.isArray(storageStructure.savedList)) {
            return false
        }
        return true
    }

    function getStorage() {
        const DEFAULT_STRORAGE: StorageTemplateType = { savedList: [] }
        const storage = localStorage.getItem('hareshi_animate_storage')

        let parsedStorage: StorageTemplateType = DEFAULT_STRORAGE

        if (storage !== null) {
            try {
                parsedStorage = {
                    ...JSON.parse(storage)
                }

                console.log('after parsedStorage', parsedStorage)

                if (!validateStructure(parsedStorage)) {
                    throw new Error('Invalid storage structure')
                }
            } catch (e) {
                console.log(e)
                parsedStorage = DEFAULT_STRORAGE
            }
        }

        console.log('parsedStorage', parsedStorage)

        const _savedList = new Observable(parsedStorage.savedList)

        animeStorage = {
            ...parsedStorage,
            savedList: _savedList,
        }
    }

    function saveStorage() {
        localStorage.setItem('hareshi_animate_storage', JSON.stringify(animeStorage))
    }

    function createAnimeData(): AnimeType {
        const coverImage: string = document.querySelector<HTMLImageElement>('.info .img-cover')!.src
        const title = document.querySelector<HTMLHeadingElement>('.info #anipop.title')!.innerText
        const animeId = window.location.pathname.split('/')[3]
        const host = window.location.hostname
        const path = window.location.pathname

        return { title, coverImage, animeId, host, path }
    }

    function addToSavedList(anime: AnimeType) {
        if (animeStorage!.savedList.get().findIndex((i) => i.animeId === anime.animeId) > -1) {
            console.log('Already exists')
            return
        }

        animeStorage!.savedList.update((saved: AnimeType[]): AnimeType[] => [...saved, anime])
        saveStorage()
    }

    function removeFromSaveList(storageIndex?: number) {
        const pageInfo = getPageInfo()
        const index = storageIndex || pageInfo.storageIndex
        animeStorage!.savedList.update((saved: AnimeType[]): AnimeType[] => [
            ...saved.slice(0, index),
            ...saved.slice(index + 1),
        ])
        saveStorage()
    }

    // Inject save button on anime info page
    const toolbarHeader = document.createElement('div')

    function injectSaveButton() {

        const saveToggleButton = document.createElement('BUTTON')
        saveToggleButton.style.background = 'var(--primary)'
        saveToggleButton.style.color = '#fff'
        saveToggleButton.style.borderRadius = '.25rem'
        saveToggleButton.style.marginRight = '4px'

        const pageInfo = getPageInfo()
        saveToggleButton.innerText = pageInfo.isSamePage ? '✅ Saved' : '➕ Save'

        animeStorage?.savedList.onChange(() => {
            const pageInfo = getPageInfo()
            saveToggleButton.innerText = pageInfo.isSamePage ? '✅ Saved' : '➕ Save'
        })

        saveToggleButton.addEventListener('click', () => {
            const pageInfo = getPageInfo()
            if (pageInfo.isSamePage) {
                removeFromSaveList()
            } else {
                addToSavedList(createAnimeData())
            }
        })

        const underCoverMenu = document.createElement('DIV')
        underCoverMenu.appendChild(saveToggleButton)

        // I commented it because ... this component won't load during first paint
        // const coverImgParent = document.querySelector<HTMLDivElement>('.info .img-cover')!.parentNode!
        // const coverImgParent = document.querySelector<HTMLDivElement>('.info .info-col')
        // coverImgParent!.appendChild(underCoverMenu)

        toolbarHeader.appendChild(saveToggleButton)
    }

    // Inject tool bar
    function injectToolbar() {
        const toolbar = document.createElement('div')
        toolbar.style.position = 'fixed'
        toolbar.style.top = '72px'
        toolbar.style.right = '16px'
        toolbar.style.background = 'var(--primary)'
        toolbar.style.borderRadius = '.25rem'

        const title = document.createElement('span')
        title.innerText = 'Saved list'

        toolbarHeader.appendChild(title)
        toolbarHeader.style.padding = '0px 4px'

        toolbar.appendChild(toolbarHeader)

        // Create SavedList Container
        const savedListContainer = document.createElement('DIV')
        savedListContainer.style.background = '#fff'
        savedListContainer.style.padding = '2px'

        function renderSavedList() {
            const list = animeStorage!.savedList.get()

            savedListContainer.innerHTML = ''

            // List Saved items
            list.forEach((item, index) => {
                // Set anime list title
                const title: HTMLAnchorElement = document.createElement('a')
                title.innerText = item.title
                title.href = `${item.path}`
                title.style.marginBottom = '4px'

                const delButton: HTMLButtonElement = document.createElement('button')
                delButton.innerText = '🗑️'
                delButton.style.border = 'none'
                delButton.style.marginRight = '2px'
                delButton.addEventListener('click', () => {
                    removeFromSaveList(index)
                })

                const animeItem = document.createElement('DIV')
                animeItem.appendChild(delButton)
                animeItem.appendChild(title)

                savedListContainer.appendChild(animeItem)
            })
        }

        // First loaded
        renderSavedList()
        toolbar.appendChild(savedListContainer)

        // Trigger on saved list changed
        animeStorage!.savedList.onChange(() => {
            renderSavedList()
            toolbar.appendChild(savedListContainer)
        })

        document.body.appendChild(toolbar)
        console.log(getPageInfo())
    }

    function buildMenu() {}

    // Check page type
    enum PAGE_TYPE {
        ANIME_PAGE, LIST_PAGE, INVALID
    }

    function checkWeb(): PAGE_TYPE {
        if (window.location.pathname.search(/\/browse\/anime\/\d/) === 0) {
            return PAGE_TYPE.ANIME_PAGE
        }
        if (window.location.pathname.search('/browse/anime') === 0) {
            return PAGE_TYPE.LIST_PAGE
        }

        return PAGE_TYPE.INVALID
    }

    // Check is the same page as saved anime
    function getPageInfo() {
        const pageType = checkWeb()
        const animeId = pageType === PAGE_TYPE.ANIME_PAGE && window.location.pathname.split('/').length >= 3 ? window.location.pathname.split('/')[3] : null
        const storageIndex = pageType === PAGE_TYPE.ANIME_PAGE ? animeStorage!.savedList.get().findIndex((i) => i.animeId === animeId) : -1
        return {
            type: pageType,
            path: window.location.pathname,
            animeId,
            isSamePage: storageIndex > -1,
            storageIndex,
        }
    }

    // Inject tool for each
    function injectTools() {
        if (checkWeb() === PAGE_TYPE.ANIME_PAGE) {
            injectSaveButton()
        }
        injectToolbar()
    }

    getStorage()
    injectTools()
}

// window.onload = loadMyList
loadMyList()