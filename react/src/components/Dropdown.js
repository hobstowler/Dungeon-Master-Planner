import React, { useState, useEffect } from "react"

export default function Dropdown({cell, datum, changeData, keyVal, editId}) {
    const [drop, setDrop] = useState([])
    const [display, setDisplay] = useState('')
    const [options, setOptions] = useState([])

    useEffect(() => {
        getDropdown()
    },[])
    useEffect(() => {
        compileDrop()
        changeData(keyVal, translate(datum))
    },[datum])
    useEffect(() => {
        changeData(keyVal, translate(datum))
    },[drop])

    const dropdownChange = (e) => {
        changeData(keyVal, translate(e.target.value))
    }

    const translate = (val) => {
        //console.log('val')
        if (options === undefined) {return}
        let value = parseInt(val)
        for (let i = 0; i < options.length; i++) {
            let row = []
            for (let x in options[i]) {
                row.push(options[i][x])
            }
            if (Number.isNaN(value) && row[1] === val) {
                return row[0]
            } else if (row[0] === value) {
                return row[0]
            }

        }
    }

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
        let value = parseInt(datum)
        let display = ''
        let val = -1
        console.log('opts', opts)
        for (let i = 0; i < opts.length; i++) {
            let row = []
            for (let x in opts[i]) {
                row.push(opts[i][x])
            }
            if (editId >= 0 && isNaN(value) && row[1] === datum) {
                val = row[0]
            } else if (editId >= 0 && value === row[0]) {
                val = row[0]
                display = row[1]
            } else {
                compiled.push(row)
            }
        }
        if (cell.IS_NULLABLE === 'YES') {
            compiled.splice(0,0,['undefined', 'None'])
        }
        if (editId >= 0) {
            //if (isNaN(display)) {}
            compiled.splice(0,0,[val, display])
        } else {
            compiled.splice(0,0,['',''])
        }
        console.log(compiled)
        setDrop(compiled)
    }

    return (
        <select onChange={dropdownChange}>
            {drop.map((opt, i) => {
                return (<option value={opt[0]} key={i}>{opt[1]}</option>)
            })}
        </select>
    )
}