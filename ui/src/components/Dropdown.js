import React, { useState, useEffect } from "react"

// a dropdown menu for a form
export default function Dropdown({cell, datum, changeData, keyVal, editId}) {
    const [drop, setDrop] = useState([])
    const [resetSelect, setSel] = useState(true)
    const [options, setOptions] = useState([])

    useEffect(() => {
        getDropdown()
    },[])

    // resets when the data changes
    useEffect(() => {
        setSel(false)
        compileDrop()
        changeData(keyVal, translate(datum))
    },[datum])

    // resets the dropdown when the list of values changes
    useEffect(() => {
        changeData(keyVal, translate(datum))
    },[drop])

    // literally just forces a rerender to ensure correct values float to the top
    useEffect(() => {
        if (!resetSelect) {
            setSel(true)
        }
    }, [resetSelect])

    // handles value changes for dropdown menu
    const dropdownChange = (e) => {
        changeData(keyVal, translate(e.target.value))
    }

    // translates from FK IDs to named values
    const translate = (val) => {
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

    // pulls FK data for the dropdown.
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

    //compiles the dropdown and floats the current value of the row to the top (if edit mode)
    const compileDrop = (opts) => {
        if (opts === undefined) {opts = options}
        let compiled = []
        let value = parseInt(datum)
        let display = ''
        let val = -1
        for (let i = 0; i < opts.length; i++) {
            let row = []
            for (let x in opts[i]) {
                row.push(opts[i][x])
            }
            if (editId >= 0 && isNaN(value) && row[1] === datum) {
                display = datum
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
            compiled.splice(0,0,[val, display])
        } else {
            compiled.splice(0,0,['',''])
        }
        setDrop(compiled)
    }
    if (resetSelect) {
        return (
        <select onChange={dropdownChange}>
            {drop.map((opt, i) => {
                return (<option value={opt[0]} key={i}>{opt[1]}</option>)
            })}
        </select>
    )
    } else {
        return (<div></div>)
    }
}