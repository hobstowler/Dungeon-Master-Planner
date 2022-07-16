'use strict'

import 'dotenv/config'
import express from "express"
import fs from 'fs'
import {createForm, createTable, navigationBar} from "./misc.js";
import bodyParser from "express";
import {pool} from "./db.js";

const app = express();
const PORT = process.env.PORT
const db = pool

app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('style'))
app.use(bodyParser.json())

// below segment adapted from https://expressjs.com/en/advanced/developing-template-engines.html
app.engine('html', (filePath, options, callback) => { // define the template engine
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
app.set('view engine', 'html') // register the template engine

app.get('/', (req, res) => {
    return res.render('index', {
        title: 'The Dungeon Master\'s Planner',
        header: 'The Dungeon Master\'s Planner',
        subHeader: 'Welcome to the Home Page',
        nav: navigationBar(),
        description: 'Choose one of the links above to get started.',
        table: '',
        input: ''
    })
})

app.get('/dungeon_masters', (req, res) => {
    return res.render('dungeon_masters', {
        title: 'The Dungeon Master\'s Planner - DMs',
        header: 'These are your Dungeon Masters',
        subHeader: '',
        nav: navigationBar(),
        description: '',
        table: createTable(), // TODO
        input: ''
    })
})

app.get('/scenarios', (req, res) => {
    return res.render('scenarios', {
        title: 'The Dungeon Master\'s Planner - Scenarios',
        header: 'These are your scenarios',
        subHeader: 'Welcome to the Home Page',
        nav: navigationBar(),
        description: 'This is where the description goes.',
        table: createTable(),
        input: createForm()
    })
})

app.get('/dungeons', (req, res) => {
    return res.render('dungeons', {
        title: 'The Dungeon Master\'s Planner - Dungeons',
        header: 'These are your dungeons',
        subHeader: '',
        nav: navigationBar(),
        description: 'This is where the description goes.',
        table: createTable(),
        input: createForm()
    })
})

app.get('/monsters', (req, res) => {
    return res.render('monsters', {
        title: 'The Dungeon Master\'s Planner - Monsters',
        header: 'These are your monsters',
        subHeader: 'Welcome to the Home Page',
        nav: navigationBar(),
        description: 'This is where the description goes.',
        table: createTable(),
        input: createForm()
    })
})

app.get('/items', (req, res) => {
    return res.render('items', {
        title: 'The Dungeon Master\'s Planner - Items',
        header: 'This is your loot',
        subHeader: 'Welcome to the Home Page',
        nav: navigationBar(),
        description: 'This is where the description goes.',
        table: createTable(),
        input: createForm()
    })
})

app.get('/biomes', (req, res) => {
    db.query('SELECT biome_name, description FROM Biomes', (err, results) => {
        console.log('yeah...')
        console.log(results[0])
        return res.render('biomes', {
            title: 'The Dungeon Master\'s Planner - Biomes',
            header: 'These are your biomes',
            subHeader: 'Welcome to the Home Page',
            nav: navigationBar(),
            description: 'This is where the description goes.',
            table: results,
            input: createForm()
        })
    })
})

app.get('/types', (req, res) => {
    db.query('SELECT * FROM Types')
    return res.render('types', {
        title: 'The Dungeon Master\'s Planner - Types',
        header: 'These are possible item types',
        subHeader: 'Welcome to the Home Page',
        nav: navigationBar(),
        description: 'This is where the description goes.',
        table: createTable(),
        input: createForm()
    })
})

app.get('/reload_data', (req, res) => {
    let result = db.query('schema.sql')
    console.log(result)
    return res.send('Database Reloaded.<br /><a href="/">Home</a>')
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})