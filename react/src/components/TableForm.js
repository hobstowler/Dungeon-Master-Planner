import React, { useState, useEffect } from "react"

import TableFormCell from "./TableFormCell"

export default function TableForm({meta, rowData, reg, editMode, setEditMode}) {
    const [metaData, setMetadata] = useState([])
    const [data, setData] = useState([])

    const cancelEdit = () => {
        setEditMode(false)
    }

    const changeData = (i, new_val) => {
        let new_data = data
        new_data[i] = new_val
        setData(new_data)
    }
    const updateData = () => {
        console.log(data)
    }
    const resetData = () => {
        if (editMode) {
            let compiled = []
            for (let x in rowData) {
                compiled.push(rowData[x])
            }
            setData(compiled)
        } else {
            setData([])
        }
    }

    useEffect(() => {resetData()},[editMode])
    useEffect(() => {
        if (meta !== undefined && rowData !== undefined) {
            setMetadata(meta)
            resetData()
        }
    }, [meta, rowData])

    return (
        <tr>
            {meta.map((cell, i) => <TableFormCell cell={cell} i={i} changeData={changeData} updateData={updateData} datum={data[i]} reg={reg} editMode={editMode} />)}
            {editMode ? <td colSpan={2} id='formCancel' onClick={cancelEdit}>Cancel</td> : <td></td>}
        </tr>
    )
}