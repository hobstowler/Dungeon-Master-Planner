'use strict'

import 'dotenv/config'
import express from "express"
import fs from 'fs'
import {createForm, buildTable, navigationBar} from "./misc.js";
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
app.use(express.json())

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
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Dungeon_Masters'", (err, results) => {
        let metadata = results
        db.query('SELECT * from Dungeon_Masters', (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

app.get('/dungeon_masters/:id', (req, res) => {
    let dm_id = req.params.id
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Dungeon_Masters'", (err, results) => {
        let metadata = results
        db.query(`SELECT * FROM Dungeon_Masters WHERE dungeon_master_id=${dm_id}`, (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

app.post('/dungeons_masters/:id', (req, res) => {

})

app.delete('/dungeon_masters/:id', (req, res) => {

})

app.get('/scenarios', (req, res) => {
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Scenarios'", (err, results) => {
        let metadata = results
        db.query('SELECT * FROM Scenarios', (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

app.get('/scenarios/:id', (req, res) => {
    let scen_id = req_params.id
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Scenarios'", (err, results) => {
        let metadata = results
        db.query(`SELECT * FROM Scenarios WHERE scenario_id=${scen_id}'`, (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

app.post('/scenarios/:id', (req, res) => {

})

app.delete('/scenarios/:id', (req, res) => {

})

app.get('/dungeons', (req, res) => {
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Dungeons'", (err, results) => {
        let metadata = results
        db.query('SELECT * FROM Dungeons', (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

app.get('/dungeons/:id', (req, res) => {
    let dungeon_id = req.params.id
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Dungeons'", (err, results) => {
        let metadata = results
        db.query(`SELECT * FROM Dungeons WHERE dungeon_id=${dungeon_id}`, (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

app.post('/dungeons/:id', (req, res) => {

})

app.delete('/dungeons/:id', (req, res) => {

})

app.get('/monsters', (req, res) => {
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Monsters'", (err, results) => {
        let metadata = results
        db.query('SELECT * FROM Monsters', (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

app.get('/monsters/:id', (req, res) => {
    let monster_id = req.params.id
    b.query("SELECT * from `Information_Schema`.`columns` where table_name='Monsters'", (err, results) => {
        let metadata = results
        db.query(`SELECT * FROM Monsters WHERE monster_id=${monster_id}`, (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

app.post('/monsters/:id', (req, res) => {

})

app.delete('/monsters/:id', (req, res) => {

})

app.get('/items', (req, res) => {
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Items'", (err, results) => {
        let metadata = results
        db.query('SELECT * FROM Items', (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

app.get('/items/:id', (req, res) => {
    let item_id = req.params.id
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Items'", (err, results) => {
        let metadata = results
        db.query(`SELECT * FROM Items WHERE item_id=${item_id}`, (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

app.post('/items/:id', (req, res) => {

})

app.delete('/items/:id', (req, res) => {

})

app.get('/biomes', (req, res) => {
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Biomes'", (err, results) => {
        let metadata = results
        db.query('SELECT * FROM Biomes', (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

app.get('/biomes/:id', (req, res) => {
    let biome_id = req.params.id
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Biomes'", (err, results) => {
        let metadata = results
        db.query(`SELECT * FROM Biomes WHERE biome_id=${biome_id}`, (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

app.post('/biomes/:id', (req, res) => {

})

app.delete('/biomes/:id', (req, res) => {

})

app.get('/types', (req, res) => {
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Types'", (err, results) => {
        let metadata = results
        db.query('SELECT * from Types', (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

app.get('/types/:id', (req, res) => {
    let type_id = req.params.id
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Types'", (err, results) => {
        let metadata = results
        db.query(`SELECT * FROM Types WHERE type_id=${type_id}`, (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

app.post('/types/:id', (req, res) => {

})

app.delete('/types/:id', (req, res) => {

})


app.get('/dungeons_has_monsters', (req, res) => {
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Dungeons_Has_Monsters'", (err, results) => {
        let metadata = results
        db.query('SELECT * FROM Dungeons_Has_Monsters', (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})


app.get('/scenarios_has_items', (req, res) => {
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Scenarios_Has_Items'", (err, results) => {
        let metadata = results
        db.query('SELECT * FROM Scenarios_Has_Items', (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})


// TODO make this work???
app.get('/reload_data', (req, res) => {
    let result = db.query('schema.sql')
    console.log(result)
    return res.send('Database Reloaded.<br /><a href="/">Home</a>')
})

app.get('/metadata/:table', (req, res) => {
    let table_name = req.params.table
    db.query(`SELECT * FROM Information_Schema.columns where table_name='${table_name}'`, (err, results) => {
        console.log(results)
        res.send(results)
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})