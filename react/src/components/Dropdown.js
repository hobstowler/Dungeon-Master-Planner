import React, { useState, useEffect } from "react"

export default function Dropdown({cell, datum, handleChange, i, editId}) {
    const [drop, setDrop] = useState([])
    const [options, setOptions] = useState([])
    console.log(datum)
    useEffect(() => {
        getDropdown()
    },[])
    useEffect(() => {
        setDrop([])
        compileDrop()
    },[datum])

    const getDropdown = () => {
        let table = cell.TABLE_NAME
        let column = cell.COLUMN_NAME
        fetch(`/get_fk/${table}/${column}`)
            .then(response => response.json())
            .then(json => {
                setOptions(json)
                compileDrop(json)
            })
    }
    const compileDrop = (opts) => {
        if (opts === undefined) {opts = options}
        let compiled = []
        let display = datum
        let val = -1
        for (let i = 0; i < opts.length; i++) {
            let row = []
            for (let x in opts[i]) {
                row.push(opts[i][x])
            }
            console.log('row',row[1])
            if (row[1] === datum) {
                val = row[0]
            } else {
                compiled.push(row)
            }
        }
        if (cell.IS_NULLABLE === 'YES') {
            compiled.splice(0,0,['undefined', 'None'])
        }
        if (editId >= 0) {
            compiled.splice(0,0,[val, display])
        } else {
            compiled.splice(0,0,['',''])
        }
        console.log(compiled)
        setDrop(compiled)
    }

    return (
        <select onClick={handleChange}>
            {drop.map((opt, i) => {
                return (<option value={opt[0]} key={i}>{opt[1]}</option>)
            })}
        </select>
    )
}