// ==UserScript==
// @name         YouTube Close Button
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/feed/subscriptions
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

const PREFIX = 'AAAAA-'

;(async function () {
    'use strict'

    console.log('AAAA', 'sleep')


    // CSS injection

    const style = document.createElement('style')
    style.textContent = `
.${PREFIX}close-button {
    width: 100%;
    height: 28px;
    background-color: #ffd1d1;
    cursor: pointer;
    margin-bottom: 10px;
    outline: none;
    border: none;
    border-radius: 8px;
}
.${PREFIX}close-button:hover {
    background-color: #f0baba;
}
`
    document.head.appendChild(style)

    await sleep(2000)

    checkH3(document.querySelector('ytd-browse.style-scope'))
    const observer = new MutationObserver(processNewH3)
    observer.observe(document.body, { childList: true, subtree: true })
})()

function sleep(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration))
}

function checkH3(node) {
    node.querySelectorAll('h3').forEach((h3) => {
        processH3(h3)
    })
}

async function processH3(h3) {
    const button = document.createElement('button')
    button.textContent = 'X'
    button.classList.add(PREFIX + 'close-button')
    h3.append(button)

    button.onclick = async () => {
        button.parentElement.parentElement.querySelector('button#button').click()
        await sleep(200)
        document.querySelector('ytd-menu-service-item-renderer.style-scope:last-child > tp-yt-paper-item:nth-child(1)').click()
    }
}

function processNewH3(mutationList) {
    for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            for (const newNode of mutation.addedNodes) {
                if (newNode.tagName === 'h3') {
                    processH3(newNode)
                } else {
                    checkH3(newNode)
                }
            }
        }
    }
}