import React, { useState, useEffect } from "react"
import Dropdown from "./Dropdown";
import InputDate from "./InputDate";

export default function TableFormCell({cell, datum, data, i, changeData, updateData, addData, regex, editId}) {
    const [value, setValue] = useState('')

    // used to update the display when the underlying value changes
    useEffect(() => {
        let new_val = (editId >= 0) ? data[i] : ''
        setValue(new_val)
    }, [datum])
    // sets the value displayed when entering edit mode and clears it when exiting.
    useEffect(() => {
        if (editId < 0) {setValue('')}
        else {
            setValue(datum)
        }
    },[editId])

    const handleChange = (e) => {
        console.log('handling it', e.target.value)
        setValue(e.target.value)
        changeData(i, e.target.value)
    }

    if (cell !== undefined) {
        if (cell.COLUMN_KEY === 'PRI') {
            return (
                <td><input type='submit' onClick={editId >= 0 ? updateData : addData} value={editId >= 0 ? 'Update': 'Add New'} /></td>
            )
        } else if (cell.COLUMN_KEY === 'MUL') {  // UNDO
            return (
                <td>
                    <Dropdown cell={cell} datum={datum} changeData={changeData} keyVal={i} editId={editId} />
                </td>
            )
        } else if (regex.char.test(cell.COLUMN_TYPE)) {
            return (
                <td><input type='text' maxLength={cell.CHARACTER_MAXIMUM_LENGTH} onChange={handleChange} value={value || ''} /></td>
            )
        } else if (cell.COLUMN_TYPE === 'datetime') {
            return (
                <InputDate cell={cell} datum={datum} changeData={changeData} keyVal={i} />
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