import React, { useEffect, useState } from "react"
import {MdDeleteForever, MdEdit } from 'react-icons/md';

export default function TableRow({dataRow, setEditMode, setEditId, tid}) {
    const [row, setRow] = useState([])

    const edit = () => {
        setEditId(tid)
        setEditMode(true)
    }
    const del = () => {console.log('delete')}

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
            <td onClick={edit} className='rowEdit'><MdEdit /></td>
            <td onClick={del} className='rowDelete'><MdDeleteForever /></td>
        </tr>
    )
}