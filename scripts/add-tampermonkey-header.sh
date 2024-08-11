#!/bin/bash

echo -e "// ==UserScript==
// @name         Hareshi - My List
// @match        https://www.hareshi.net/*
// @description  Hareshi's Saved list
// @namespace    jirachai.me
// @version      $(date '+%Y-%m-%d')
// @author       Jirachai Chansivanon
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hareshi.net
// @updateURL    https://github.com/antronic/hareshi-my-list/raw/main/build/hareshi-my-list.min.user.js
// @downloadURL  https://github.com/antronic/hareshi-my-list/raw/main/build/hareshi-my-list.min.user.js
// @version      0.3
// @grant        none
// ==/UserScript==
\n$(cat build/hareshi-my-list.min.js)
" > build/hareshi-my-list.min.user.js