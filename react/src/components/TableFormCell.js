import React, { useState, useEffect } from "react"

export default function TableFormCell({cell, datum, i, changeData, updateData, addData, regex, editMode}) {
    const [value, setValue] = useState('')
    const [drop, setDrop] = useState([])
    const [options, setOptions] = useState([])

    useEffect(() => {
        if (cell.COLUMN_KEY === 'MUL') {
            console.log('dropping down')
            getDropdown()
        }
    },[])
    // used to update the display when the underlying value changes
    useEffect(() => {
        let new_val = (editMode) ? datum : ''
        setValue(new_val)
    }, [datum])
    // sets the value displayed when entering edit mode and clears it when exiting.
    useEffect(() => {
        console.log(drop)
        console.log(options)
        if (!editMode) {setValue('')}
        else {
            setValue(datum)
        }
    },[editMode])
    useEffect(() => {
        console.log('coompiling')
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
                console.log('yes')
                val = row[0]
            } else {
                compiled.push(row)
            }
        }
        if (cell.IS_NULLABLE === 'YES') {
            compiled.splice(0,0,['undefined', 'None'])
        }
        if (editMode) {
            compiled.splice(0,0,[val, display])
        } else {
            compiled.splice(0,0,['',''])
        }
        console.log(compiled)
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