import React, { useEffect, useState } from "react";
import TableForm from "./TableForm";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default function Table({refreshData, data, metadata, reg}) {
    const [editMode, setEditMode] = useState(false)
    const [editId, setEditId] = useState([])
    const [header, setHeader] = useState([])
    const [fkData, setFkData] = useState([])
    const [tableLoad, setTableLoadMessage] = useState("Loading Table...")
    const dataDisplayTimer = setTimeout(() => {setTableLoadMessage("No data to display.")}, 5000)

    useEffect(() => { // move to refreshData
        if (data !== undefined && data.length > 0) {
            compileHeader()
        }
        getFkData()
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
    const getFkData = () => {
        for (let i = 0; i < metadata.length; i++) {
            if (metadata[i].COLUMN_KEY === 'MUL') {
                let table = metadata[i].TABLE_NAME
                let column = metadata[i].COLUMN_NAME
                fetch(`/get_fk/${table}/${column}`)
                    .then(response => response.json())
                    .then(json => {
                        let new_fk = fkData
                        if (new_fk[i] === undefined) {new_fk[i] = []}
                        for (let j = 0; j < json.length; j++) {
                            let temp = []
                            for (let x in json[j]) {
                                temp.push(json[j][x])
                            }
                            new_fk[i][temp[0]] = temp[1]
                        }
                        setFkData([new_fk])
                    })
            }
        }
    }

    return (
        <table cellSpacing={0}>
            <thead>
                <TableHeader header={header} />
            </thead>
            <tbody>
            {(data.length === 0) ? <tr><td colSpan={metadata.length + 2}>{tableLoad}</td></tr> :
                    data.map((row, i) => <TableRow
                        dataRow={row}
                        fkData={fkData}
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
                    setEditMode={setEditMode}
                    refreshData={refreshData} />
            </tbody>
        </table>
    )
}