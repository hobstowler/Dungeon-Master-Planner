import React, { useState, useEffect } from "react"

import TableFormCell from "./TableFormCell"

export default function TableForm({meta, rowData, reg, editMode, setEditMode}) {
    console.log('row:', rowData)
    const [metaData, setMetadata] = useState([
        'id','name','desc'
    ])
    const [data, setData] = useState([])

    const cancelEdit = () => {
        setEditMode(false)
    }

    useEffect(() => {
        if (meta !== undefined && rowData !== undefined) {
            setMetadata(meta)
            let compiled = []
            for (let x in rowData) {
                console.log('x', x)
                compiled.push(rowData[x])
            }
            console.log('comp', compiled)
            setData(compiled)
        }
    }, [meta, rowData])

    return (
        <tr>
            {meta.map((cell, i) => <TableFormCell cell={cell} datum={data[i]} reg={reg} editMode={editMode} />)}
            {editMode ? <td colSpan={2} id='formCancel' onClick={cancelEdit}>Cancel</td> : undefined}
        </tr>
    )
}