import React, { useState, useEffect } from "react"

import TableFormCell from "./TableFormCell"

// form for a table
export default function TableForm({meta, rowData, regex, editId, setEditId, setError, refreshData}) {
    const [metadata, setMetadata] = useState([])
    const [data, setData] = useState([])

    // cancels edit mode by clearing the edit id
    const cancelEdit = () => {
        setEditId(-1)
    }

    // changes the data to be sent when updating or adding. called when input detects change
    const changeData = (i, new_val) => {
        let new_data = data
        new_data[i] = new_val
        setData(new_data)
    }

    // sends a POST request to add an entry to the database
    const addData = () => {
        let dataToSend = {}
        for (let i = 1; i < metadata.length; i++) {
            if (data[i] !== undefined) {
                dataToSend[metadata[i].COLUMN_NAME] = data[i]
            }
        }
        fetch(`${metadata[0].TABLE_NAME}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        })
            .then(response => {
                if (response.status === 201) {
                    refreshData()
                }
                return response.json()
            })
            .then(json => {
                setError(JSON.stringify(json.error))
            })
            .catch(error => console.log(error))
    }

    // sends a PUT request to update existing data in the db
    const updateData = () => {
        let id = metadata[0].TABLE_NAME.slice(0,metadata[0].TABLE_NAME.length-1) + ' ID'
        id = id.replaceAll('_', ' ')
        id = id.replace('Has', 'has')
        id = id.replace(/s\b/, "")
        let dataToSend = {'id': rowData[id]}
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
                setError(JSON.stringify(json.error))
            })
            .catch(error => console.log(error))
    }

    // resets data in the form when the editing row changes
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

    useEffect(() => {
        resetData()
    },[editId])
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