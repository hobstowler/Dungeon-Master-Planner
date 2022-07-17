'use strict'

import {pool} from "./db.js";
const reg_varchar = new RegExp('varchar*')
const reg_text = new RegExp('text*')

export function navigationBar() {
    return (`
        <nav>
            <a href="/">Home</a>
            <a href="/dungeon_masters">Dungeon Masters</a>
            <a href="/scenarios">Scenarios</a>
            <a href="/dungeons">Dungeons</a>
            <a href="/monsters">Monsters</a>
            <a href="/items">Items</a>
            <a href="/biomes">Biomes</a>
            <a href="/types">Types</a>
        </nav>
    `.replace(/>\s*</g, '><'))
}

export function buildTable(data, metadata) {
    if (data === undefined || data.length === 0) {
        return `<table cellspacing=0><thead><tr><th>Column</th></tr></thead><tbody><tr><td>Row</td></tr></tbody></table>`
    }
    let table = `<table cellspacing=0><thead><tr>`

    for (let key in data[0]) {
        table += `<th>${key}</th>`
    }

    table += '</tr></thead><tbody>'

    for (let i = 0; i < data.length; i++) {
        table += '<tr>'
        for (let key in data[i]) {
            table += `<td>${data[i][key]}</td>`
        }
        table += '</tr>'
    }

    if (metadata !== undefined) {
        table += parseForm(metadata)
    }

    table += '</tbody></table>'
    console.log(table)

    return table
}

/* 
    Regex code adapted from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    Date: 7/16/22
*/
export function parseForm(metadata) {
    let formRow = '<tr><form>'
    for (let i = 0; i < metadata.length; i++) {
        let column = metadata[i]
        if (column['COLUMN_KEY'] === 'PRI') {
            formRow += "<td><input type='submit' value='Add New' /></td>"
        } 
        else if (reg_varchar.test(column['COLUMN_TYPE'])) {
            let max_char = column['CHARACTER_MAXIMUM_LENGTH']
            formRow += `<td><input type='text' maxlength=${max_char} /></td>`
        } else if (reg_text.test(column['COLUMN_TYPE'])) {
            let max_char = column['CHARACTER_MAXIMUM_LENGTH']
            formRow += `<td><textarea maxlength="${max_char}"></textarea></td>`
        }
    }
    formRow += '</form></tr>'
    
    return formRow
}

function getForeignKey(foreignKey, table, id) {
    db.query(`SELECT ${foreignKey} FROM ${table} WHERE ${foreignKey}=${id}`)
}

export function createForm() {
    return '<button type="submit">Submit</button>'
}