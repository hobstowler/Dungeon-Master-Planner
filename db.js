import mysql from "mysql";

export const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_towlerj',
    password: '4942',
    database: 'cs340_towlerj'
});

export function getBiomes() {
    let results = pool.query('SELECT * FROM Biomes')
    res.send(JSON.stringify(results))
}

export function getTypes() {
    let results = pool.query('SELECT * FROM Types')
    res.send(JSON.stringify(results))
}