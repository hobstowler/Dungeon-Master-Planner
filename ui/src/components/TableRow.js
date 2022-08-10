import React, { useEffect, useState } from "react"
import {MdDeleteForever, MdCancel, MdEdit } from 'ui-icons/md';
import Cell from "./Cell";

// a row in a table
export default function TableRow({dataRow, fkData, metadata, editId, setEditId, refreshData, tid, active, intersection, showDetail, setShowDetail, setDetail, setError}) {
    const [row, setRow] = useState([])

    // toggle edit mode by passing a row id
    const edit = () => {
        setEditId(tid)
    }

    // cancel edit mode by clearing a row id
    const cancel = () => {
        setEditId(-1)
    }

    // delete a row
    const del = () => {
        let table = metadata[0].TABLE_NAME
        fetch(`/${table}/${row[0]}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => {
                if (response.status === 204) {
                    cancel()
                    setTimeout(refreshData(), 1500)
                }
                return response.json()
            })
            .then(json => {
                setError(JSON.stringify(json.error))
            })
            .catch(error => console.log(error))
    }

    // expands the details for an intersection table
    const expandDetails = () => {
        setShowDetail(true)
        setDetail(row[0], row[1])
    }

    // compiles the dict into a more easily digested 2d array
    useEffect(() => {
        let compiled = []
        for (let x in dataRow) {
            compiled.push(dataRow[x])
        }
        setRow(compiled)
    }, [dataRow])

    return (
        <tr className={active ? 'active' : 'inactive'}>
            {row.map((cell, i) => <td><Cell fkData={fkData} metadata={metadata[i]} key={i} i={i} value={cell} /></td>)}
            {(tid === editId && editId >= 0) ?
                <td onClick={cancel} className='rowEdit'><MdCancel /></td> :
                <td onClick={edit} className='rowEdit'><MdEdit /></td>}
            <td onClick={del} className='rowDelete'><MdDeleteForever /></td>
            {intersection !== undefined ? <td><span onClick={expandDetails}>View Details &gt;&gt;</span></td> : <td></td>}
        </tr>
    )
}