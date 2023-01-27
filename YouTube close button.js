// ==UserScript==
// @name         YouTube Close Button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/feed/subscriptions
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    console.log('AAAA','sleep')
    await sleep(2000)

    var titles = document.querySelectorAll('h3')
    console.log('AAAA',titles)
    titles.forEach((e) => {
        const button = document.createElement('button')
        button.textContent='CL'
        e.after(button)
    })
})();

function sleep(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration))
}