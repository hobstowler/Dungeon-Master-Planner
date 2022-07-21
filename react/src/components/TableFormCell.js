import React, { useState, useEffect } from "react"

export default function TableFormCell({cell, datum, i, changeData, updateData, reg, editMode}) {
    console.log(cell)
    const [value, setValue] = useState('')

    useEffect(() => {
        let new_val = (editMode) ? datum : ''
        setValue(new_val)
    }, [datum])

    useEffect(() => {
        if (editMode === false) {
            setValue('')
        } else {
            setValue(datum)
        }
    },[editMode])

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
            return (
                <td>
                    <select>
                        <option value='NULL'>Null</option>
                    </select>
                </td>
            )
        } else if (reg.char.test(cell.COLUMN_TYPE) || cell.COLUMN_TYPE === 'date') {
            return (
                <td><input type='text' maxLength={cell.CHARACTER_MAXIMUM_LENGTH} onChange={handleChange} value={value || ''} /></td>
            )
        } else if (reg.text.test(cell.COLUMN_TYPE)) {
            return (
                <td><textarea maxLength={cell.CHARACTER_MAXIMUM_LENGTH} onChange={handleChange} value={value || ''}></textarea></td>
            )
        } else if (reg.int.test(cell.COLUMN_TYPE) || reg.dec.test(cell.COLUMN_TYPE)) {
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