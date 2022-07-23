import React, { useEffect, useState } from "react"
import {MdDeleteForever, MdCancel, MdEdit } from 'react-icons/md';
import { useNavigate } from "react-router-dom"

export default function TableRow({dataRow, metadata, editMode, setEditMode, editId, setEditId, tid}) {
    const [row, setRow] = useState([])
    const navigate = useNavigate()
    console.log('meta', row)

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
                    console.log(`/`)
                    navigate(`/`)
                }
            })
    }


    useEffect(() => {
        let compiled = []
        for (let x in dataRow) {
            compiled.push(dataRow[x])
        }
        setRow(compiled)
    }, [dataRow])
    
    return (
        <tr>
            {row.map((cell, i) => <td key={i}>{cell}</td>)}
            {(tid === editId && editMode) ?
                <td onClick={cancel} className='rowEdit'><MdCancel /></td> :
                <td onClick={edit} className='rowEdit'><MdEdit /></td>}
            <td onClick={del} className='rowDelete'><MdDeleteForever /></td>
        </tr>
    )
}