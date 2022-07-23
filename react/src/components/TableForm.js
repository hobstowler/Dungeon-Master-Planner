import React, { useState, useEffect } from "react"

import TableFormCell from "./TableFormCell"

export default function TableForm({meta, rowData, regex, editMode, setEditMode}) {
    const [metadata, setMetadata] = useState([])
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
        if (meta !== undefined) {
            setMetadata(meta)
            resetData()
        }
    }, [meta, rowData])

    return (
        <tr>
            {metadata.map((cell, i) =>
                <TableFormCell
                    cell={cell}
                    changeData={changeData}
                    updateData={updateData}
                    datum={data[i]}
                    regex={regex}
                    editMode={editMode}
                    key={i} />
            )}
            {editMode ? <td colSpan={2} id='formCancel' onClick={cancelEdit}>Cancel</td> : <td></td>}
        </tr>
    )
}