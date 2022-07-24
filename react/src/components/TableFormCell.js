import React, { useState, useEffect } from "react"

export default function TableFormCell({cell, datum, i, changeData, updateData, addData, regex, editMode}) {
    const [value, setValue] = useState('')
    const [dispVal, setDispVal] = useState('')
    const [drop, setDrop] = useState([])
    const [options, setOptions] = useState([])

    useEffect(() => {
        let new_val = (editMode) ? datum : ''
        setValue(new_val)
    }, [datum])
    useEffect(() => {
        if (!editMode) {setValue('')}
        else {
            setValue(datum)
        }
    },[editMode])
    useEffect(() => {
        compileDrop(options)
    },[value])

    const compileDrop = (options) => {
        let compiled = []
        let display = value
        let val = -1
        for (let i = 0; i < options.length; i++) {
            let row = []
            for (let x in options[i]) {
                row.push(options[i][x])
            }
            if (row[1] === display) {
                val = row[0]
            } else {
                compiled.push(row)
            }
        }
        if (cell.IS_NULLABLE === 'YES') {
            compiled.splice(0,0,[null, 'None'])
        }
        if (editMode) {
            compiled.splice(0,0,[val, display])
        }
        setDrop(compiled)
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
    const handleChange = (e) => {
        setValue(e.target.value)
        changeData(i, e.target.value)
    }

    if (cell !== undefined) {
        if (cell.COLUMN_KEY === 'PRI') {
            return (
                <td><input type='submit' onClick={editMode ? updateData : addData} value={editMode ? 'Update': 'Add New'} /></td>
            )
        } else if (cell.COLUMN_KEY === 'MUL') {  // UNDO
            if (drop.length === 0) {
                getDropdown()
            }
            return (
                <td>
                    <select onChange={handleChange} >
                        {drop.map((opt, i) => {
                            return (<option value={opt[0]} key={i}>{opt[1]}</option>)
                        })}
                    </select>
                </td>
            )
        } else if (regex.char.test(cell.COLUMN_TYPE) || cell.COLUMN_TYPE === 'datetime') {
            return (
                <td><input type='text' maxLength={cell.CHARACTER_MAXIMUM_LENGTH} onChange={handleChange} value={value || ''} /></td>
            )
        } else if (regex.text.test(cell.COLUMN_TYPE)) {
            return (
                <td><textarea maxLength={cell.CHARACTER_MAXIMUM_LENGTH} onChange={handleChange} value={value || ''}></textarea></td>
            )
        } else if (regex.int.test(cell.COLUMN_TYPE) || regex.dec.test(cell.COLUMN_TYPE)) {
            return (
                <td><input type='number' maxLength={cell.CHARACTER_MAXIMUM_LENGTH} onChange={handleChange} value={value || 0} /></td>
            )
        }
    } else {
        return (
            <td>Null</td>
        )
    }
}