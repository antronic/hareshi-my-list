#!/bin/bash

echo -e "// ==UserScript==
// @name         Hareshi - My List
// @match        https://www.hareshi.net/*
// @description  Hareshi's Saved list
// @namespace    jirachai.me
// @version      $(date '+%Y-%m-%d')
// @author       Jirachai Chansivanon
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hareshi.net
// @downloadURL  https://raw.githubusercontent.com/antronic/hareshi-my-list/main/build/hareshi-my-list.tampermonkey.min.js
// @version      0.2
// @grant        none
// ==/UserScript==
\n$(cat build/hareshi-my-list.min.js)
" > build/hareshi-my-list.min.user.js