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

    // called when input on the cell changes value
    const handleChange = (e) => {
        setValue(e.target.value)
        changeData(i, e.target.value)
    }

    // don't render anything if there's no metadata
    if (cell !== undefined) {
        // if column is primary key
        if (cell.COLUMN_KEY === 'PRI') {
            return (
                <td><input type='submit' onClick={editId >= 0 ? updateData : addData} value={editId >= 0 ? 'Update': 'Add New'} /></td>
            )
        // if column is foreign key
        } else if (cell.COLUMN_KEY === 'MUL') {  // UNDO
            return (
                <td>
                    <Dropdown cell={cell} datum={datum} changeData={changeData} keyVal={i} editId={editId} />
                </td>
            )
        // if column is type char
        } else if (regex.char.test(cell.COLUMN_TYPE)) {
            return (
                <td><input type='text' maxLength={cell.CHARACTER_MAXIMUM_LENGTH} onChange={handleChange} value={value || ''} /></td>
            )
        // if column type is datetime
        } else if (cell.COLUMN_TYPE === 'datetime') {
            return (
                <InputDate cell={cell} datum={datum} changeData={changeData} keyVal={i} />
            )
        // if column type is text, textarea
        } else if (regex.text.test(cell.COLUMN_TYPE)) {
            return (
                <td><textarea maxLength={cell.CHARACTER_MAXIMUM_LENGTH} onChange={handleChange} value={value || ''}></textarea></td>
            )
        // if column type is numeric
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