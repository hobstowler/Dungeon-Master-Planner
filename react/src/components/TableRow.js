import React, { useEffect, useState } from "react"
import {MdDeleteForever, MdEdit } from 'react-icons/md';

export default function TableRow({dataRow}) {
    const [row, setRow] = useState([])

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
            <td><button type="button"><MdEdit />}</button></td>
            <td><button type="button"><MdDeleteForever /></button></td>
        </tr>
    )
}