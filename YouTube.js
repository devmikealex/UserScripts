// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict'
    waitForQuerySelector('yt-formatted-string.ytd-video-primary-info-renderer:nth-child(1)').then(
        (elm) => {
            elm.style.color = 'red'
        }
    )
    waitForQuerySelector('#info-text').then(
        (elm) => {
            document.querySelector(".super-title").appendChild(elm);
        }
    )
})()

function waitForQuerySelector(selector) {
    console.info('AAAAA', 'Wait for:', selector)
    // https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
    return new Promise((resolve) => {
        let element = document.querySelector(selector)
        if (element) {
            console.info('AAAAA', 'Ready:', element)
            console.info('AAAAA', element.textContent)
            resolve(element)
        }
        const observer = new MutationObserver(() => {
            element = document.querySelector(selector)
            if (element) {
                observer.disconnect()
                console.info('AAAAA', 'Ready:', element)
                console.info('AAAAA', element.textContent)
                resolve(element)
            }
        })
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })
    })
}
