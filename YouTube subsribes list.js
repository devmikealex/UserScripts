// selecotr for subsribes list
var menu = document.querySelector("ytd-guide-section-renderer.style-scope:nth-child(2) > div:nth-child(2)")

var links = menu.querySelectorAll("a")
links.forEach(link => {
    if (link.title && link.className==='yt-simple-endpoint style-scope ytd-guide-entry-renderer') {
        console.log(link.title, link.href);
    }
})