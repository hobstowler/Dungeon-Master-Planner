import React, { useState, useEffect } from "react"

export default function TableFormCell({cell, datum, i, changeData, updateData, regex, editMode}) {
    const [value, setValue] = useState('')
    const [drop, setDrop] = useState([])

    useEffect(() => {
        let new_val = (editMode) ? datum : ''
        setValue(new_val)
    }, [datum])

    useEffect(() => {
        if (!editMode) {setValue('')}
        else {
            setValue(datum)
            setDrop([])
        }
    },[editMode])

    const compileDrop = (drop) => {
        let compiled = []
        for (let i = 0; i < drop.length; i++) {
            let row = []
            for (let x in drop[i]) {
                row.push(drop[i][x])
            }
            compiled.push(row)
        }
        setDrop(compiled)
    }

    const getDropdown = () => {
        let table = cell.TABLE_NAME
        let column = cell.COLUMN_NAME
        fetch(`/get_fk/${table}/${column}`)
            .then(response => response.json())
            .then(json => {compileDrop(json)})
    }

    const handleChange = (e) => {
        setValue(e.target.value)
        changeData(i, e.target.value)
    }

    if (cell !== undefined) {
        if (cell.COLUMN_KEY === 'PRI') {
            return (
                <td><input type='submit' onClick={updateData} value={editMode ? 'Update': 'Add New'} /></td>
            )
        } else if (cell.COLUMN_KEY === 'MUL') {
            if (drop.length === 0) {
                getDropdown()
            }
            return (
                <td>
                    <select onChange={handleChange}>
                        <option value={(editMode) ? value : ''}>
                            {(editMode) ? value : ''}
                        </option>
                        {drop.map((opt, i) => {
                            return (<option value={opt[0]} key={i}>{opt[1]}</option>)
                        })}
                    </select>
                </td>
            )
        } else if (regex.char.test(cell.COLUMN_TYPE) || cell.COLUMN_TYPE === 'date') {
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