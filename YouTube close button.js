(function() {
    'use strict';

    var titles = document.querySelectorAll('h3')
    // console.log(titles)
    titles.forEach((e) => {
        const button = document.createElement('button')
        button.textContent='CL'
        e.after(button)
    })
})();