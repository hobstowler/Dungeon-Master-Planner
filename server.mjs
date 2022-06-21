'use strict'

import 'dotenv/config'
import express from "express"
import fs from 'fs'
import {createForm, createTable, navigationBar} from "./misc.js";

const app = express();
const PORT = process.env.PORT

app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('style'))

// below segment adapted from https://expressjs.com/en/advanced/developing-template-engines.html
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
        title: 'The Home Page',
        header: 'This is the Home Page',
        subHeader: 'Welcome to the Home Page',
        nav: navigationBar(),
        description: 'This is where the description goes.',
        table: createTable(),
        input: createForm()
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})