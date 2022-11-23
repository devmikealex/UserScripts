// ==UserScript==
// @name         Feedly KP Button
// @namespace    http://tampermonkey.net/
// @version      0.21
// @description  try to take over the world!
// @author       You
// @match        https://feedly.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=feedly.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // alert(111155)

    var style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML =
        '.extra-button{position: fixed;right: 0;top: 50%;opacity: 0.95;border-radius: 4px;background: rgba(0, 0, 220, 0.8);color: white;font-size: 10px;padding: 6px;cursor: pointer;}'
    document.getElementsByTagName('head')[0].appendChild(style)

    const button = document.createElement('div')
    button.textContent = 'K'
    button.className = 'extra-button'
    console.log(button)
    document.getElementsByTagName('body')[0].appendChild(button)

    button.onclick = function(){
        addButtons()
    };

    function addButtons() {
        var titles = document.querySelectorAll('.entry__title')
        // console.log(titles)
        var style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = '.kp-button{padding: 3px 4px 0px 4px;}'
        style.innerHTML += '.kp-button:hover{text-decoration: none !important;}'
        document.getElementsByTagName('head')[0].appendChild(style)

        titles.forEach((e) => {
            const button = document.createElement('a')

            let title = e.textContent
            console.log('title-1:', title)
            title = title.replace('[Обновлено]', '')
            console.log('title-2:', title)
            const skobka = title.indexOf('[') + 1
            const year = title.slice(skobka, skobka + 4)
            title = title.slice(0, title.indexOf('(')).trim()
            console.log('title-3:', title)
            title = title.replaceAll('/', '')
            console.log('title-4:', title)
            title = title.replace(/[\\/:*?\&"<>|]/g, '') // удаление плохих символов
            title = title.replace(/\s+/g, ' ') // удаление пробелов подряд
            title = title.trim()
            console.log('title-5:', title)
            console.log('year:', year)

            button.href=`https://www.kinopoisk.ru/index.php?kp_query=${title} ${year}`
            button.target='_blank'
            // button.textContent='КП'

            const icon = document.createElement('img')
            icon.src='https://www.google.com/s2/favicons?sz=64&domain=kinopoisk.ru'
            icon.width=16
            button.appendChild(icon)

            button.style.marginRight='6px'
            button.style.fontWeight='600'
            button.className='kp-button'

            e.before(button)
            console.log(e.textContent)
            e.style.display = 'inline'

            button.addEventListener('click', (e) => {
                e.stopPropagation()
                // e.preventDefault()
            })
        })
    }
})();