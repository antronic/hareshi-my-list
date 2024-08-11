#!/bin/bash

echo -e "// ==UserScript==
// @name         Hareshi - My List
// @namespace    jirachai.me
// @version      $(date '+%Y-%m-%d')
// @description  Hareshi is an anime directory website that provides a comprehensive list of anime and channels to watch them. However, it doesn’t include a “favorite” or "saved list" feature, which is why I built this script.
// @author       Jirachai Chansivanon
// @match        https://www.hareshi.net/browse/anime*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hareshi.net
// @downloadURL  https://raw.githubusercontent.com/antronic/hareshi-my-list/main/build/hareshi-my-list.tampermonkey.min.js
// @version      0.1
// @grant        none
// ==/UserScript==
\n$(cat build/hareshi-my-list.min.js)
" > build/hareshi-my-list.tampermonkey.min.js