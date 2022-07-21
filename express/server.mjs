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

/***************************************************************
********************   DUNGEON MASTERS   ***********************
****************************************************************/
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

app.put('/dungeons_masters/:id', (req, res) => {
    let dm_id = req.params.id;
    let sql_query = `UPDATE Dungeon_Masters 
    SET dungeon_master_name =${dungeon_master_name}, lucky_dice =${lucky_dice}
    WHERE dungeon_master_id=${dm_id};`;
    db.query(sql_query, (err, results) => {
        if (err) throw err;
    })
})

app.post('/dungeons_masters', (req, res) => {
    let dm_id = req.params.id;
    let sql_query = `INSERT INTO Dungeon_Masters (dungeon_master_name, lucky_dice)
    VALUES (${dungeon_master_name}, ${lucky_dice});`;
    db.query(sql_query, (err, results) => {
        if (err) throw err;
    })
})

app.delete('/dungeon_masters/:id', (req, res) => {
    let dm_id = req.params.id
    db.query(`DELETE FROM Dungeon_Masters WHERE dungeon_master_id=${dm_id}`, (err, results) => {
        if (err) throw err;
    })
})


/***************************************************************
************************  SCENARIOS   **************************
****************************************************************/

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

app.put('/scenarios/:id', (req, res) => {
    let scenario_id = req.params.id;
    let sql_query = `UPDATE Scenarios
    SET scenario_name = :${scenario_name}, summary =${summary}, 
    target_level =${target_level}, session_time =${session_time}, 
    dungeon_master_id =${dungeon_master_id}, dungeon_id =${dungeon_id}
    WHERE scenario_id=${scenario_id};`;
    db.query(sql_query, (err, results) => {
        if (err) throw err;
    })
})

app.post('/scenarios', (req, res) => {
    let scenario_id = req.params.id;
    let sql_query = `INSERT INTO Scenarios (scenario_id, scenario_name, summary, target_level, session_time, 
        dungeon_master_id, dungeon_id)
        VALUES (${scenario_id}, ${scenario_name}, ${summary}, ${target_level}, 
        ${session_time}, ${dungeon_master_id}, ${dungeon_id});`;
    db.query(sql_query, (err, results) => {
        if (err) throw err;
    })
})

app.delete('/scenarios/:id', (req, res) => {
    let scenario_id = req.params.id
    db.query(`DELETE FROM Scenarios WHERE scenario_id=${scenario_id}`, (err, results) => {
        if (err) throw err;
    })
})


/***************************************************************
*************************  DUNGEONS   **************************
****************************************************************/

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

app.put('/dungeons/:id', (req, res) => {
    let dungeon_id = req.params.id;
    let sql_query = `UPDATE Dungeons
    SET dungeon_name =${dungeon_name}, description =${description}, 
    light_level =${light_level}, biome_id =${biome_id}
    WHERE dungeon_id=${dungeon_id};`;
    db.query(sql_query, (err, results) => {
        if (err) throw err;
    })
})

app.delete('/dungeons/:id', (req, res) => {
    let dungeon_id = req.params.id
    db.query(`DELETE FROM Dungeons WHERE dungeon_id=${dungeon_id}`, (err, results) => {
        if (err) throw err;
    })
})



/***************************************************************
************************  MONSTERS   **************************
****************************************************************/

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
    let monster_id = req.params.id
    db.query(`DELETE FROM Monsters WHERE monster_id=${monster_id}`, (err, results) => {
        if (err) throw err;
    })
})


/***************************************************************
**************************  ITEMS   ****************************
****************************************************************/

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
    let items_id = req.params.id
    db.query(`DELETE FROM Items WHERE item_id=${item_id}`, (err, results) => {
        if (err) throw err;
    })
})


/***************************************************************
**************************  BIOMES   ***************************
****************************************************************/

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
    let biomes_id = req.params.id
    db.query(`DELETE FROM Biomes WHERE biome_id=${biome_id}`, (err, results) => {
        if (err) throw err;
    })
})


/***************************************************************
***************************  TYPES   ***************************
****************************************************************/

app.get('/types', (req, res) => {
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Types'", (err, results) => {
        let metadata = results
        db.query('SELECT type_id from Types', (err, results) => {
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
    let type_id = req.params.id
    db.query(`DELETE FROM Types WHERE type_id=${type_id}`, (err, results) => {
        if (err) throw err;
    })
})


/***************************************************************
******************  DUNGEONS HAS MONSTERS   ********************
****************************************************************/

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


app.delete('/dungeons_has_monsters/:id', (req, res) => {
    let dungeon_has_monster_id = req.params.id
    db.query(`DELETE FROM Dungeons_Has_Monsters WHERE dungeon_has_monster_id=${dungeon_has_monster_id}`, (err, results) => {
        if (err) throw err;
    })
})


/***************************************************************
*******************  SCENARIOS HAS ITEMS   *********************
****************************************************************/

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


app.delete('/scenarios_has_items/:id', (req, res) => {
    let scenario_has_item_id = req.params.id
    db.query(`DELETE FROM Scenarios_Has_Items WHERE scenario_has_item_id=${scenario_has_item_id}`, (err, results) => {
        if (err) throw err;
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