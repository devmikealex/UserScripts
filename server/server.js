const express = require('express')
const clc = require('cli-color')

const PORT = process.env.PORT || 3055
const app = express()

var options = {
    etag: false,
    setHeaders: function (res, path, stat) {
        console.log('path', path)
        // console.log('stat', stat)
        res.set('x-timestamp', Date.now())
        res.set('Cache-Control', 'no-store')
    },
}
app.use(express.static('../', options)) // we start from the parent folder

app.use((req, res, next) => {
    console.log(
        clc.magentaBright('---middleware:'),
        clc.green(req.method),
        req.originalUrl
    )
    res.set('Cache-Control', 'no-store')
    next()
})

app.listen(PORT, () => {
    console.log()
    console.log('Start server')
    console.log('Working Dir:', process.cwd())
    console.log(clc.yellowBright(`http://127.0.0.1:${PORT}`))
})
