# Hareshi - My list (Chrome script)

[Hareshi](https://www.hareshi.net/) is an anime directory website that provides a comprehensive list of anime and channels to watch them.
However, it doesn’t include a “favorite” or "saved list" feature, which is why I built this script.

![](/images/hero.png)

## Feature
- Save your interested anime
  - **"+ Save"** will only appear on the anime information page.
- View your saved list
  - The saved list is stored in `localStorage`
- [Upcoming - when I'm not lazy] - Hide or collapse the list

## 🪲 Known bugs
- [x] ~~List doesn't update on page changed~~ ([Issue#1](https://github.com/antronic/hareshi-my-list/issues/1)) **(Fix with experimental [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API))

## Usage

I’m kind of a lazy person, so I don’t want to mess around with creating a Google Chrome extension and need to develop and run things quickly.

So, I decided not to build this as an extension but instead to use an existing script runner like ["Tampermonkey"](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) to run my script

### For [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) user

1. Install [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

2. Allow ["Developer mode"](chrome://extensions/)
- To learn why this is necessary, read this FAQ:
[Q209: Developer mode to run userscripts](https://www.tampermonkey.net/faq.php#Q209)

3. Install from the button below or this [link](https://github.com/antronic/hareshi-my-list/raw/main/build/hareshi-my-list.min.user.js)

[![](/images/add-to-tampermonkey-btn.png)](https://github.com/antronic/hareshi-my-list/raw/main/build/hareshi-my-list.min.user.js)

4. Then click **Install**

![](/images/add-to-tampermoney-step.jpg)


> ## ! CAUTION !!
>
> Using Tampermonkey comes with some security concerns, as it allows users to add any script, including malicious ones, which could harm your computer, browser, or even steal your cookies, credentials, and sensitive data.
>
> Therefore, if you choose to use Tampermonkey, you do so at your own risk.

If you have other script runner methods, please feel free to use them and share your experience in this GitHub repository.

**If you’re ready to proceed, follow the instructions below:**

### For other tools and developer

1. Clone this project

2. Install npm package
```bash
$ npm install
```

3. Run build command
```bash
$ npm run build
```

4. You can use the source code from these:
- Non-minify: `dist/index.js`
- Minify: `build/hareshi-my-list.min.js`
- For TamperMonkey: `build/hareshi-my-list.min.user.js`


## Confession
The UX and UI may not make sense in some parts including the code itself as well. I apologize for that, as I was a bit too lazy = 3=

And you may also notice that I put some what the -- stuff inside about "`Observable` class", this is my experimental on using [`Event API`](https://developer.mozilla.org/en-US/docs/Web/API/Event). You can try and learn more about it as well.

So, if anyone is interested in adding more features or making improvements, please feel free to fork and contribute~!

## License
MIT. Enjoy krub!