import React, { useState, useEffect } from "react"

export default function TableFormCell({cell, reg}) {

    if (cell !== undefined) {
        if (cell.COLUMN_KEY === 'PRI') {
            return (
                <></>
            )
        } else if (cell.COLUMN_KEY === 'MUL') {
            return (
                <>
                <label>{cell.COLUMN_NAME}</label><br />
                <select>
                    <option value='NULL'>Null</option>
                </select>
                <br />
                </>
            )
        } else if (reg.char.test(cell.COLUMN_TYPE) || cell.COLUMN_TYPE === 'date') {
            return (
                <>
                <label>{cell.COLUMN_NAME}</label><br />
                <input type='text' maxlength={cell.CHARACTER_MAXIMUM_LENGTH} />
                <br />
                </>
            )
        } else if (reg.text.test(cell.COLUMN_TYPE)) {
            return (
                <>
                <label>{cell.COLUMN_NAME}</label><br />
                <textarea maxlength={cell.CHARACTER_MAXIMUM_LENGTH} ></textarea>
                <br />
                </>
            )
        } else if (reg.int.test(cell.COLUMN_TYPE) || reg.dec.test(cell.COLUMN_TYPE)) {
            return (
                <>
                <label>{cell.COLUMN_NAME}</label><br />
                <input type='number' maxlength={cell.CHARACTER_MAXIMUM_LENGTH} />
                <br />
                </>
            )
        }
    } else {
        return (
            <></>
        )
    }
}