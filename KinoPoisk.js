// ==UserScript==
// @name         KP
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match      https://www.kinopoisk.ru/film/*
// @match      https://www.kinopoisk.ru/series/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kinopoisk.ru
// @grant        none
// @sandbox JavaScript
// ==/UserScript==

(async function() {
    'use strict';
    // alert('b');
    console.log('AAAAA - START')

    let rating = '',
        imdb = ''

    rating = await waitForQuerySelector('.film-rating-value')
    rating = rating.textContent
    console.info('AAAAA KP rating:', rating)
    await sleep(1000)
    document.title = `${rating} ${document.title}`

    imdb = await waitForQuerySelector('.film-sub-rating',5000)
    if (imdb) {
        // console.log('AAAAA imdb:', imdb)
        imdb = imdb.textContent
        imdb = imdb.slice(5, 9).trim()
        console.log('AAAAA imdb:', imdb)
    } else {
        console.log('AAAAA imdb NOT FOUND')
        imdb = '-'
    }
    document.title = `${imdb} ${document.title}`

    const titleOnPage = document.getElementsByTagName('h1')
    console.log('titleOnPage', titleOnPage[0])
    if (titleOnPage[0]) titleOnPage[0].innerHTML += `<br>${rating}<br>IMDB: ${imdb}`

    var style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML =
        '.extra-button{position: fixed;right: 0;top: 50%;opacity: 0.95;border-radius: 4px;background: rgba(0, 0, 220, 0.8);color: white;font-size: 10px;padding: 6px;cursor: pointer;z-index: 1000;}'
    document.getElementsByTagName('head')[0].appendChild(style)

    var button = document.createElement('div')
    button.textContent = '-'
    button.className = 'extra-button'
    console.log(button)
    document.getElementsByTagName('body')[0].appendChild(button)

    var titleEng = await waitForQuerySelector('span[class*="styles_originalTitle__"]', 1000)
    if (titleEng){
        titleEng = titleEng.textContent
        console.log("AAAAA titleEng", titleEng)
        button.textContent='IMDB'
    }else{
        button.textContent='no'
    }

    button.onclick = function(){
        const url=`https://www.imdb.com/find?s=all&q=${titleEng}`
        window.open(url, '_blank')
    };

    console.log('AAAAA - END')
})();

function waitForQuerySelector(selector, delay=10000) {
    console.log('AAAAA-', 'Wait for:', selector)
    // https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
    return new Promise((resolve) => {
        let element = document.querySelector(selector)
        if (element) {
            console.log('AAAAA-1', 'Ready:', selector, element)
            console.log('AAAAA-1 textContent', element.textContent)
            resolve(element)
            return
        }
        console.log('AAAAA-2 observer')
        const timeout = setTimeout(() => {
            console.log('AAAAA-2 NOT FOUND', delay, selector)
            resolve(null)
        }, delay)
        const observer = new MutationObserver(() => {
            element = document.querySelector(selector)
            if (element) {
                observer.disconnect()
                console.log('AAAAA-2', 'Ready:', selector, element)
                console.log('AAAAA-2 textContent', element.textContent)
                clearTimeout(timeout)
                resolve(element)
            }
        })
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })
    })
}

function sleep(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration))
}
