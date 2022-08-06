import React, { useState, useEffect } from "react"

import TableFormCell from "./TableFormCell"

// tweaked form for intersection table detailed views
export default function DetailTableForm({meta, rowData, regex, editId, setEditId, setError, refreshData, detailInfo}) {
    const [metadata, setMetadata] = useState([])
    const [data, setData] = useState([])

    // clears edit mode by reseting the edit ID
    const cancelEdit = () => {
        setEditId(-1)
    }

    // handles input value changes from user input
    const changeData = (i, new_val) => {
        let new_data = data
        new_data[i] = new_val
        setData(new_data)
    }

    // POST request to add new row to db
    const addData = () => {
        let dataToSend = {}
        for (let i = 1; i < metadata.length; i++) {
            if (data[i] !== undefined) {
                dataToSend[metadata[i].COLUMN_NAME] = data[i]
            }
        }
        dataToSend[detailInfo.columnName] = detailInfo.id
        console.log(dataToSend)
        fetch(`${metadata[0].TABLE_NAME}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        })
            .then(response => {
                if (response.status === 201) {
                    refreshData()
                }
            })
    }

    // PUT request to update data in db
    const updateData = () => {
        let id = metadata[0].TABLE_NAME.slice(0,metadata[0].TABLE_NAME.length-1) + 's ID'
        id = id.replaceAll('_', ' ')
        let dataToSend = {'id': rowData[id]}
        dataToSend[detailInfo.columnName] = detailInfo.id
        for (let i = 1; i < metadata.length; i++) {
            dataToSend[metadata[i].COLUMN_NAME] = data[i]
        }
        fetch(`${metadata[0].TABLE_NAME}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        })
            .then(response => {
                if (response.status === 200) {
                    refreshData()
                    cancelEdit()
                }
                return response.json()
            })
            .then(json => {
                console.log(json)
                setError(JSON.stringify(json.error))
            })
    }

    // resets the data when edit id changes
    const resetData = () => {
        if (editId => 0) {
            let compiled = []
            for (let x in rowData) {
                compiled.push(rowData[x])
            }
            setData(compiled)
        } else {
            setData([])
        }
    }

    // calls reset data
    useEffect(() => {
        resetData()
    },[editId])

    // resets form when data changes (like when edit mode toggles)
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
                    addData={addData}
                    datum={data[i]}
                    data={data}
                    regex={regex}
                    editId={editId}
                    key={i}
                    i={i}
                    mainTableName={metadata.length > 0 ? metadata[0].TABLE_NAME : ''} />
            )}
            {editId >= 0 ? <td colSpan={2} id='formCancel' onClick={cancelEdit}>Cancel</td> : <td></td>}
        </tr>
    )
}