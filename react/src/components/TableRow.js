import React, { useEffect, useState } from "react"

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
        <tr>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
    )
}