import React, { useEffect, useState } from "react";
import TableForm from "./TableForm";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import EditForm2 from "./EditForm2";

export default function Table({data, meta, reg}) {
    const [rowData, setRowData] = useState([])
    const [metaData, setMetadata] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [editId, setEditId] = useState([])

    useEffect(() => {
        if (data !== undefined && meta !== undefined) {
            console.log('meta', meta, 'data',data)
            setMetadata(meta)
            setRowData(data)
        }
    }, [data, meta])

    return (
        <table cellSpacing={0}>
            <thead>
                <TableHeader meta={metaData} />
            </thead>
            <tbody>
                {rowData.map((row, i) => <TableRow key={i} tid={i} dataRow={row} setEditMode={setEditMode} setEditId={setEditId} />)}
                <tr><td id={editMode ? 'formEdit' : 'formAddNew'} colSpan={3}>{editMode ? 'Edit:' : 'Add New Entry'}</td></tr>
                <TableForm meta={metaData} rowData={rowData[editId]} reg={reg} editMode={editMode} setEditMode={setEditMode} />
            </tbody>
        </table>
    )
}