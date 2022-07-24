import React, { useEffect, useState } from "react"
import {MdDeleteForever, MdCancel, MdEdit } from 'react-icons/md';
import Cell from "./Cell";

export default function TableRow({dataRow, fkData, metadata, editMode, setEditMode, editId, setEditId, refreshData, tid}) {
    const [row, setRow] = useState([])
    const [hasDetails, setHasDetails] = useState(false)

    useEffect(() => {
        let compiled = []
        for (let x in dataRow) {
            compiled.push(dataRow[x])
        }
        setRow(compiled)
    }, [dataRow])

    const edit = () => {
        setEditId(tid)
        setEditMode(true)
    }
    const cancel = () => {
        setEditMode(false)
    }
    const del = () => {
        let table = metadata[0].TABLE_NAME
        fetch(`/${table}/${row[0]}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => {
                if (response.status === 204) {
                    refreshData()
                }
            })
            .catch(error => console.log(error))
    }
    const expandDetails = () => {

    }
    
    return (
        <tr>
            {row.map((cell, i) => <td><Cell fkData={fkData} key={i} i={i} value={cell} /></td>)}
            {(tid === editId && editMode) ?
                <td onClick={cancel} className='rowEdit'><MdCancel /></td> :
                <td onClick={edit} className='rowEdit'><MdEdit /></td>}
            <td onClick={del} className='rowDelete'><MdDeleteForever /></td>
            {hasDetails ? <td><span onClick={expandDetails}>View Details</span></td> : <td></td>}
        </tr>
    )
}