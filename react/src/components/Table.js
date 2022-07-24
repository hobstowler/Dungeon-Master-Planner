import React, { useEffect, useState } from "react";
import TableForm from "./TableForm";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default function Table({refreshData, data, metadata, reg}) {
    const [editMode, setEditMode] = useState(false)
    const [editId, setEditId] = useState([])
    const [header, setHeader] = useState([])

    useEffect(() => { // move to refreshData
        if (data !== undefined && data.length > 0) {
            compileHeader()
        }
    }, [data])

    const compileHeader = () => {
        let compiled = []
        if (data !== undefined) {
            for (let x in data[0]) {
                compiled.push(x)
            }
        }
        setHeader(compiled)
    }

    return (
        <table cellSpacing={0}>
            <thead>
                <TableHeader header={header} />
            </thead>
            <tbody>
            {(data.length === 0) ? <tr><td colSpan={metadata.length + 2}>Loading Table...</td></tr> :
                    data.map((row, i) => <TableRow
                        dataRow={row}
                        metadata={metadata}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        editId={editId}
                        setEditId={setEditId}
                        refreshData={refreshData}
                        tid={i}
                        key={i} />)}
                <tr><td id={editMode ? 'formEdit' : 'formAddNew'} colSpan={3}>{editMode ? 'Edit:' : 'Add New Entry'}</td></tr>
                <TableForm
                    meta={metadata}
                    rowData={data[editId]}
                    regex={reg}
                    editMode={editMode}
                    setEditMode={setEditMode} />
            </tbody>
        </table>
    )
}