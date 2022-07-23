import React, { useEffect, useState } from "react";
import TableForm from "./TableForm";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import EditForm2 from "./EditForm2";

export default function Table({tableName, data, meta, reg}) {
    const [rowData, setRowData] = useState([])
    const [metaData, setMetadata] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [editId, setEditId] = useState([])
    const [header, setHeader] = useState([])

    useEffect(() => { // move to refreshData
        if (data !== undefined && meta !== undefined) {
            compileHeader()
            setMetadata(meta)
            setRowData(data)
        }
    }, [data, meta])

    const compileHeader = () => {
        let compiled = []
        if (data !== undefined) {
            for (let x in data[0]) {
                compiled.push(x)
            }
        }
        setHeader(compiled)
    }
    const refreshData = () => {
        fetch(`/${metaData[0].TABLE_NAME}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(json => {
                setRowData(json.data)
                setMetadata(json.metadata)
            })
            .catch(error => console.log(error))
    }

    return (
        <table cellSpacing={0}>
            <thead>
                <TableHeader header={header} />
            </thead>
            <tbody>
            {(rowData.length === 0) ? <tr><td colSpan={5}>No data to display</td></tr> :
                    rowData.map((row, i) => <TableRow
                        dataRow={row}
                        metadata={metaData}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        editId={editId}
                        setEditId={setEditId}
                        refreshData={refreshData}
                        tid={i}
                        key={i} />)}
                <tr><td id={editMode ? 'formEdit' : 'formAddNew'} colSpan={3}>{editMode ? 'Edit:' : 'Add New Entry'}</td></tr>
                <TableForm
                    meta={metaData}
                    rowData={rowData[editId]}
                    regex={reg}
                    editMode={editMode}
                    setEditMode={setEditMode} />
            </tbody>
        </table>
    )
}