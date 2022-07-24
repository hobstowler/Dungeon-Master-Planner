import React, { useState, useEffect } from "react"

export default function TableFormCell({cell, datum, i, changeData, updateData, addData, regex, editMode}) {
    const [value, setValue] = useState('')
    const [dispVal, setDispVal] = useState('')
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
            getDispVal()
        }
        console.log('val:',value)
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
    const getDispVal = () => {
        console.log(drop.length)
        for (let i = 0; i < drop.length; i++) {
            console.log('d', drop[i])
            console.log(value === drop[i][0])
            if (value === drop[i][0]) {
                console.log('fuck')
                setDispVal(drop[i][1])
            }
        }
        setDispVal(value)
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
                    <select onChange={handleChange} defaultValue={value}>
                        {cell.IS_NULLABLE === 'YES' ? <option value='null'>None</option> : null}
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