'use strict'

import 'dotenv/config'
import express from "express"
import fs from 'fs'

const app = express();
const PORT = process.env.PORT
//const fs = require('fs') // this engine requires the fs module

app.use(express.urlencoded({
    extended: true
}))

app.engine('ntl', (filePath, options, callback) => { // define the template engine
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err)
        // this is an extremely simple template engine
        const rendered = content.toString()
            .replace('#title#', `<title>${options.title}</title>`)
            .replace('#navigation#', `<nav>${options.nav}</nav>`)
            .replace('#header#', `<h1>${options.header}</h1>`)
            .replace('#subHeader#', `<h2>${options.subHeader}</h2>`)
            .replace('#description#', `<div>${options.description}</div>`)
            .replace('#table#', `<table>${options.table}</table>`)
            .replace('#input#', `<form>${options.input}</form>`)
        return callback(null, rendered)
    })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'ntl') // register the template engine

app.get('/', (req, res) => {
    return res.render('index', {
        title: 'new view',
        header: 'This iss a header',
        subHeader: 'this is the subheader',
        nav: '',
        description: '',
        table: '',
        input: ''
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})