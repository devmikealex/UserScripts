// ==UserScript==
// @name         telegra.ph - Go to Vacancy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Go to Vacancy
// @author       You
// @match        https://telegra.ph/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=telegra.ph
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const responseButton = document.querySelector('#Откликнуться > a:nth-child(1)')
    // console.log("🚀 responseButton:", responseButton)
    const url = responseButton.href
    console.log("🚀 url:", url)
    window.location.href = url
})();