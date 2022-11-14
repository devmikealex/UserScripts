// ==UserScript==
// @name         Feedly KP Button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://feedly.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=feedly.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // alert(111155)

    var titles = document.querySelectorAll('.entry__title')
    // console.log(titles)
    titles.forEach((e) => {
        const button = document.createElement('button')
        button.textContent='ÊÏ'
        button.style.marginRight='6px'
        // e.style.color = 'red'
        e.before(button)
        console.log(e.textContent)
        e.style.display = 'inline'

        button.addEventListener('click', (e) => {
            e.stopPropagation()
            e.preventDefault()

            let title = e.target.nextElementSibling.textContent
            console.log('title_org:', title)
            console.log(typeof title);
            title = title.slice(0, title.indexOf('/')).trim()
            console.log('title:', title)

            const URL = `https://www.kinopoisk.ru/index.php?kp_query=${title}`
        window.open(URL, '_blank');
        })
    })
})();