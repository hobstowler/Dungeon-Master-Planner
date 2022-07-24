'use strict'

import 'dotenv/config'
import express, { query } from "express"
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


/***************************************************************
********************   DUNGEON MASTERS   ***********************
****************************************************************/

// Display all dungeon masters
app.get('/dungeon_masters', (req, res) => {
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Dungeon_Masters'", (err, results) => {
        let metadata = results
        let nameQuery = req.query.name;
        let query = `SELECT dungeon_master_id AS "Dungeon Master ID", dungeon_master_name AS "Dungeon Master Name", lucky_dice AS "Lucky Dice" `;
        query +=  `FROM Dungeon_Masters`;
        if (nameQuery !== 'undefined') {
            query += ` WHERE dungeon_master_name LIKE '%${nameQuery}%'`
        }
        db.query(query, (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

// Retrieve a specific dungeon master by their id
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

// Update a dungeon master
app.put('/dungeons_masters/:id', (req, res) => {
    let dm_id = req.params.id;
    let dungeon_master_name = req.params.dungeon_master_name;
    let lucky_dice = req.params.lucky_dice;
    let query = `UPDATE Dungeon_Masters `;
    query += `SET dungeon_master_name =${dungeon_master_name}, lucky_dice =${lucky_dice} `;
    query += `WHERE dungeon_master_id=${dm_id};`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(201).json({'message': 'Success'});
        }
    })
})

// Create a new dungeon master
app.post('/dungeons_masters', (req, res) => {
    let dungeon_master_name = req.body.dungeon_master_name;
    let lucky_dice = req.body.lucky_dice;
    let query = `INSERT INTO Dungeon_Masters (dungeon_master_name, lucky_dice) `;
    query += `VALUES (${dungeon_master_name}, ${lucky_dice});`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else {
            return res.status(201).json({'message': 'Success'});
        }
    })
})

// Delete a dungeon master
app.delete('/dungeon_masters/:id', (req, res) => {
    let dm_id = req.params.id;
    let query = `DELETE FROM Dungeon_Masters WHERE dungeon_master_id=${dm_id}`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(204).json({'message': 'Success'});
        }
    })
})


/***************************************************************
************************  SCENARIOS   **************************
****************************************************************/

// Display all scenarios
app.get('/scenarios', (req, res) => {
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Scenarios'", (err, results) => {
        let metadata = results
        let nameQuery = req.query.name
        let query = `SELECT scenario_id AS "Scenario ID", scenario_name AS "Scenario Name", summary AS "Summary", target_level AS "Target Level", session_time AS "Session Time", Dungeon_Masters.dungeon_master_name AS "Dungeon Master", Dungeons.dungeon_name AS "Dungeon" `
        query += `FROM Scenarios `
        query += `INNER JOIN Dungeon_Masters ON Dungeon_Masters.dungeon_master_id = Scenarios.dungeon_master_id `
        query += `INNER JOIN Dungeons ON Dungeons.dungeon_id = Scenarios.dungeon_id `
        if (nameQuery !== 'undefined') {
            query += ` WHERE scenario_name LIKE '%${nameQuery}%';`
        }
        db.query(query, (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

// Retrieve a specific scenario by its id
app.get('/scenarios/:id', (req, res) => {
    let scenario_id = req_params.id
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Scenarios'", (err, results) => {
        let metadata = results
        db.query(`SELECT * FROM Scenarios WHERE scenario_id=${scenario_id}'`, (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

// Update a scenario
app.put('/scenarios/:id', (req, res) => {
    let scenario_id = req.params.id;
    let scenario_name = req.params.scenario_name;
    let summary = req.params.summary;
    let target_level = req.params.target_level;
    let session_time = req.params.session_time;
    let dungeon_master_id = req.params.dungeon_master_id;
    let dungeon_id = req.params.dungeon_id;
    let query = `UPDATE Scenarios `;
    query += `SET scenario_name = :${scenario_name}, summary =${summary}, target_level =${target_level}, `;
    query += `session_time =${session_time}, dungeon_master_id =${dungeon_master_id}, dungeon_id =${dungeon_id} `;
    query += `WHERE scenario_id=${scenario_id};`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(204).json({'message': 'Success'});
        }
    })
})

// Create a new scenario
app.post('/scenarios', (req, res) => {
    let scenario_id = req.body.id;
    let scenario_name = req.params.scenario_name;
    let summary = req.params.summary;
    let target_level = req.params.target_level;
    let session_time = req.params.session_time;
    let dungeon_master_id = req.params.dungeon_master_id;
    let dungeon_id = req.params.dungeon_id;
    let query = `INSERT INTO Scenarios (scenario_id, scenario_name, summary, target_level, session_time, `;
    query += `dungeon_master_id, dungeon_id) `
    query += `VALUES (${scenario_id}, ${scenario_name}, ${summary}, ${target_level}, ` 
    query += `${session_time}, ${dungeon_master_id}, ${dungeon_id});`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else {
            return res.status(201).json({'message': 'Success'});
        }
    })
})

// Delete a scenario
app.delete('/scenarios/:id', (req, res) => {
    let scenario_id = req.params.id;
    let query = `DELETE FROM Scenarios WHERE scenario_id=${scenario_id}`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(204).json({'message': 'Success'});
        }
    })
})


/***************************************************************
*************************  DUNGEONS   **************************
****************************************************************/

// Display all dungeons
app.get('/dungeons', (req, res) => {
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Dungeons'", (err, results) => {
        let metadata = results
        let nameQuery = req.query.name
        let query = `SELECT dungeon_id AS "Dungeon ID", dungeon_name AS "Dungeon Name", Dungeons.description AS "Description", light_level AS "Light Level", biome_id AS "Biome" `
        query += `FROM Dungeons`
        console.log(query)
        if (nameQuery !== 'undefined') {
            query += ` WHERE dungeon_name LIKE '%${nameQuery}%'`
        }
        db.query(query, (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

// Retrieve a specific dungeon by its id
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

// Update a dungeon
app.put('/dungeons/:id', (req, res) => {
    let dungeon_id = req.params.id;
    let dungeon_name = req.params.dungeon_name;
    let description = req.params.description;
    let light_level = req.params.light_level;
    let biome_id = req.params.biome_id;
    let query = `UPDATE Dungeons `;
    query += `SET dungeon_name =${dungeon_name}, description =${description}, `;
    query += `light_level =${light_level}, biome_id =${biome_id} `;
    query += `WHERE dungeon_id=${dungeon_id};`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(204).json({'message': 'Success'});
        }
    })
})

// Add a dungeon
app.post('/dungeons', (req, res) => {
    let dungeon_name = req.body.dungeon_name;
    let description = req.body.description;
    let light_level = req.body.light_level;
    let biome_id = req.body.biome_id;
    let query = `INSERT INTO Dungeons (dungeon_name, description, light_level, biome_id) `;
    query += `VALUES (${dungeon_name}, ${description}, ${light_level}, ${biome_id});`  
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else {
            return res.status(201).json({'message': 'Success'});
        }
    })
})

// Delete a dungeon
app.delete('/dungeons/:id', (req, res) => {
    let dungeon_id = req.params.id;
    let query = `DELETE FROM Dungeons WHERE dungeon_id=${dungeon_id}`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(204).json({'message': 'Success'});
        }
    })
})



/***************************************************************
************************  MONSTERS   **************************
****************************************************************/

// Display all monsters
app.get('/monsters', (req, res) => {
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Monsters'", (err, results) => {
        let metadata = results
        let nameQuery = req.query.name;
        let query = `SELECT monster_id AS "Monster ID", monster_name AS "Monster Name", description AS "Description", challenge_rating AS "Challenge Rating", health_points AS "Health Points", strength AS "Strength", dexterity AS "Dexterity", constitution AS "Constitution", intelligence AS "Intelligence", wisdom AS "Wisdom", charisma AS "Charisma", armor_class AS "Armor Class", talent AS "Talent(s)" `;
        query += `FROM Monsters`;
        if (nameQuery !== 'undefined') {
            query += ` WHERE monster_name LIKE '%${nameQuery}%'`
        }
        db.query(query, (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

// Retrieve a specific monster by its id
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

// Update a monster
app.put('/monsters/:id', (req, res) => {
    let monster_id = req.params.id;
    let monster_name = req.params.monster_name;
    let description = req.params.description;
    let challenge_rating = req.params.challenge_rating;
    let health_points = req.params.health_points;
    let strength = req.params.strength;
    let dexterity = req.params.dexterity;
    let constitution = req.params.constitution;
    let intelligence = req.params.intelligence;
    let wisdom = req.params.wisdom;
    let charisma = req.params.charisma;
    let armor_class = req.params.armor_class;
    let talent = req.params.talent;

    let query = `UPDATE Monsters`;
    query += `SET monster_name = ${monster_name}, description = ${description}, challenge_rating = ${challenge_rating}, `;
    query += `health_points = ${health_points}, strength = ${strength}, dexterity = ${dexterity}, constitution = ${constitution}, ` ;
    query += `intelligence = ${intelligence}, wisdom = ${wisdom}, charisma = ${charisma}, armor_class = ${armor_class}, talent = ${talent} `;
    query += `WHERE monster_id = ${monster_id};`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(204).json({'message': 'Success'});
        }
    })
})

// Create a new monster
app.post('/monsters', (req, res) => {
    let monster_name = req.body.monster_name;
    let description = req.body.description;
    let challenge_rating = req.body.challenge_rating;
    let health_points = req.body.health_points;
    let strength = req.body.strength;
    let dexterity = req.body.dexterity;
    let constitution = req.body.constitution;
    let intelligence = req.body.intelligence;
    let wisdom = req.body.wisdom;
    let charisma = req.body.charisma;
    let armor_class = req.body.armor_class;
    let talent = req.body.talent;
    let query = `INSERT INTO Monsters (monster_name, description, challenge_rating, health_points, strength, `;
    query += `dexterity, constitution, intelligence, wisdom, charisma, armor_class, talent) `;
    query += `VALUES (${monster_name}, ${description}, ${challenge_rating}, ${health_points}, ${strength}, `;
    query += `${dexterity}, ${constitution}, ${intelligence}, ${wisdom}, ${charisma}, ${armor_class}, ${talent});`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else {
            return res.status(201).json({'message': 'Success'});
        }
    })
})

// Delete a monster
app.delete('/monsters/:id', (req, res) => {
    let monster_id = req.params.id
    let query = `DELETE FROM Monsters WHERE monster_id=${monster_id}`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(204).json({'message': 'Success'});
        }
    })
})


/***************************************************************
**************************  ITEMS   ****************************
****************************************************************/

// Display all items
app.get('/items', (req, res) => {
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Items'", (err, results) => {
        let metadata = results
        let nameQuery = req.query.name
        let query = `SELECT item_id AS "Item ID", item_name AS "Item Name", Items.description AS "Description", weight AS "Weight", value AS "Value (in copper)", Types.type_name AS "Type" `;
        query += `FROM Items `;
        query += `INNER JOIN Types ON Items.type_id = Types.type_id `
        if (nameQuery !== 'undefined') {
            query += ` WHERE item_name LIKE '%${nameQuery}%'`
        }
        db.query(query, (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

// Retrieve a single item by its id
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

// Update an item
app.put('/items/:id', (req, res) => {
    let item_id = req.params.id;
    let item_name = req.params.item_name;
    let description = req.params.description;
    let weight = req.params.weight;
    let value = req.params.value;
    let type_id = req.params.type_id;
    let query = `UPDATE Items `;
    query += `SET item_name =${item_name}, description =${description}, weight =${weight}, `; 
    query += `value =${value}, type_id =${type_id} `;
    query += `WHERE item_id =${item_id};`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err})
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'})
        } else {
            return res.status(204).json({'message': 'Success'})
        }
    })
})

// Create a new item
app.post('/items', (req, res) => {
    let item_name = req.body.item_name
    let description = req.body.description
    let weight = req.body.weight
    let value = req.body.value
    let type_id = req.body.type_id

    let query = `INSERT INTO Items (item_name, description, weight, value, type_id) `
    query += `VALUES ('${item_name}', '${description}', ${weight}, ${value}, ${type_id})`
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err})
        } else {
            return res.status(201).json({'message': 'Success'})
        }
    })
})

// Delete an item by its id
app.delete('/items/:id', (req, res) => {
    let item_id = req.params.id
    let query = `DELETE FROM Items WHERE item_id=${item_id}`
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err})
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'})
        } else {
            return res.status(204).json({'message': 'Success'})
        }
    })
})


/***************************************************************
**************************  BIOMES   ***************************
****************************************************************/

// Display all biomes
app.get('/biomes', (req, res) => {
    let nameQuery = req.query.name
    console.log(req.query)
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Biomes'", (err, results) => {
        let metadata = results
        let query = `SELECT biome_id AS "Biome ID", biome_name AS "Biome Name", description AS "Description" `;
        query += `FROM Biomes`
        if (nameQuery !== 'undefined') {
            query += ` WHERE biome_name LIKE '%${nameQuery}%'`
        }
        db.query(query, (err, results) => {
            console.log(results)
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

// Retrieve a single biome by its id
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

// Update a biome
app.put('/biomes/:id', (req, res) => {
    let biome_id = req.params.id;
    let biome_name = req.params.biome_name;
    let description = req.params.description;
    let query = `UPDATE Biomes `;
    query += `SET biome_name = ${biome_name}, description = ${description} `;
    query += `WHERE biome_id = ${biome_id};`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(204).json({'message': 'Success'});
        }
    })
})

// Create a new biome
app.post('/biomes', (req, res) => {
    let biome_name = res.body.biome_name;
    let description = res.body.description;
    let query = `INSERT INTO Biomes (biome_name, description) `;
    query += `VALUES (${biome_name}, ${description});`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else {
            return res.status(201).json({'message': 'Success'});
        }
    })
})

// Delete a biome
app.delete('/biomes/:id', (req, res) => {
    let biome_id = req.params.id;
    let query = `DELETE FROM Biomes WHERE biome_id=${biome_id}`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(204).json({'message': 'Success'});
        }
    })
})


/***************************************************************
***************************  TYPES   ***************************
****************************************************************/

// Display all types
app.get('/types', (req, res) => {
    db.query("SELECT * from `Information_Schema`.`columns` where table_name='Types'", (err, results) => {
        let metadata = results
        let nameQuery = req.query.name
        let query = `SELECT type_id AS "Type ID", type_name AS "Type Name", description AS "Description" `;
        query += `FROM Types`;
        if (nameQuery !== 'undefined') {
            query += ` WHERE type_name LIKE '%${nameQuery}%'`
        }
        db.query(query, (err, results) => {
            return res.json({
                'data': results,
                'metadata': metadata
            })
        })
    })
})

// Retrieve a single type by its id
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

// Update a type
app.put('/types/:id', (req, res) => {
    let type_id = req.params.id;
    let type_name = req.params.type_name;
    let description = req.params.description;
    let query = `UPDATE Types `;
    query += `SET type_name = ${type_name}, description = ${description} `;
    query += `WHERE type_id = ${type_id};`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(204).json({'message': 'Success'});
        }
    })
})

// Create a new type
app.post('/types', (req, res) => {
    let type_name = req.body.type_name;
    let description = req.body.description;
    let query = `INSERT INTO Types (type_name, description) `;
    query += `VALUES (${type_name}, ${description});`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else {
            return res.status(201).json({'message': 'Success'});
        }
    })
})

// Delete a type
app.delete('/types/:id', (req, res) => {
    let type_id = req.params.id;
    let query = `DELETE FROM Types WHERE type_id=${type_id}`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(204).json({'message': 'Success'});
        }
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

// Update a relationship between a dungeon and a monster
app.put('/dungeons_has_monsters/:id', (req, res) => {
    let dungeon_has_monster_id = req.params.id;
    let dungeon_id = req.params.dungeon_id;
    let monster_id = req.params.monster_id;
    let quantity = req.params.quantity;
    let query = `UPDATE Dungeons_Has_Monsters `;
    query += `SET dungeon_id = ${dungeon_id}, monster_id = ${monster_id}, quantity = ${quantity} `;
    query += `WHERE dungeon_has_monster_id = ${dungeon_has_monster_id};`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(204).json({'message': 'Success'});
        }
    })
})

// Create a new relationship between a dungeon and a monster
app.post('/dungeons_has_monsters', (req, res) => {
    let dungeon_id = req.body.dungeon_id;
    let monster_id = req.body.monster_id;
    let quantity = req.body.quantity;
    let query = `INSERT INTO Dungeons_Has_Monsters (dungeon_id, monster_id, quantity) `;
    query += `VALUES (${dungeon_id}, ${monster_id}, ${quantity});`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else {
            return res.status(201).json({'message': 'Success'});
        }
    })
})

// Delete a relationship between a dungeon and a monster
app.delete('/dungeons_has_monsters/:id', (req, res) => {
    let dungeon_has_monster_id = req.params.id;
    let query = `DELETE FROM Dungeons_Has_Monsters WHERE dungeon_has_monster_id=${dungeon_has_monster_id}`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(204).json({'message': 'Success'});
        }
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

// Update a relationship between a scenario and an item
app.put('/scenarios_has_items/:id', (req, res) => {
    let scenario_has_item_id = req.params.id;
    let scenario_id = req.params.dungeon_id;
    let item_id = req.params.monster_id;
    let quantity = req.params.quantity;
    let query = `UPDATE Scenarios_Has_Items `;
    query += `SET scenario_id = ${scenario_id}, item_id = ${item_id}, quantity = ${quantity} `;
    query += `WHERE scenario_has_item_id = ${scenario_has_item_id};`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(204).json({'message': 'Success'});
        }
    })
})

// Create a new relationship between a scenario and an item
app.post('/scenarios_has_items', (req, res) => {
    let scenario_id = req.body.scenario_id;
    let item_id = req.body.item_id;
    let quantity = req.body.quantity;
    let query = `INSERT INTO Scenarios_Has_Items (scenario_id, item_id, quantity) `;
    query += `VALUES (${scenario_id}, ${item_id}, ${quantity});`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else {
            return res.status(201).json({'message': 'Success'});
        }
    })
})

// Delete a relationship between a scenario and an item
app.delete('/scenarios_has_items/:id', (req, res) => {
    let scenario_has_item_id = req.params.id;
    let query = `DELETE FROM Scenarios_Has_Items WHERE scenario_has_item_id=${scenario_has_item_id}`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({'error': err});
        } else if (results.affectedRows === 0) {
            return res.status(404).json({'message': 'Row not found.'});
        } else {
            return res.status(204).json({'message': 'Success'});
        }
    })
})

/* ####################################
    METADATA QUERIES
#################################### */


// TODO make this work???
app.get('/reload_data', (req, res) => {
    let result = db.query('schema.sql')
    console.log(result)
    return res.send('Database Reloaded.<br /><a href="/">Home</a>')
})

app.get('/testing', (req, res) => {
    db.query(`SELECT * from inform`)
})

app.get('/get_fk/:table/:column', (req, res) => {
    let table = req.params.table
    let column = req.params.column
    db.query(`SELECT * FROM Information_Schema.key_column_usage where table_name='${table}' and column_name='${column}'`, (err, results) => {
        if (results.length > 0 ) {
            let id = results[0].REFERENCED_COLUMN_NAME
            let target_table = results[0].REFERENCED_TABLE_NAME
            let table_len = target_table.length
            let target_col = results[0].REFERENCED_TABLE_NAME.slice(0, table_len - 1) + '_name'
            db.query(`SELECT ${id}, ${target_col} FROM ${target_table}`, (err, results) => {
                return res.json(results)
            })
        }
        else {
            return res.status(404)
        }
    })
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