// ==UserScript==
// @name         Feedly keywords Button
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

    var style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML =
        '.extra-button2{position: fixed;right: 0;top: 55%;opacity: 0.95;border-radius: 4px;background: rgba(0, 0, 220, 0.8);color: white;font-size: 10px;padding: 6px;cursor: pointer;}'
    document.getElementsByTagName('head')[0].appendChild(style)

    const button = document.createElement('div')
    button.textContent = 'M'
    button.className = 'extra-button2'
    console.log(button)
    document.getElementsByTagName('body')[0].appendChild(button)

    button.onclick = function(){
        addMarkers()
    };

    function addMarkers() {
        const a = document.getElementById('feedlyFrame')
        a.style.margin = 0

        var style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML =
            '.marker{background: rgba(249, 39, 5);color: white;}'
        document.getElementsByTagName('head')[0].appendChild(style)

        var titles = document.querySelectorAll('.EntryTitle')
        titles.forEach((e) => {
            console.log(e.innerHTML)
            e.innerHTML = replaceTitle(e.innerHTML)
        })
    }

    function replaceTitle(title) {
        const keywords=[
            'подар',
            'epic game',
            'steam',
            'gog',
            'разда',
            'бесплатн',
            'забрат'
        ]
        keywords.forEach(keyword => {
            title = title.replace(new RegExp(keyword, "ig"), '<span class="marker">'+keyword.toUpperCase()+'</span>')
        })
        return title
    }
})();