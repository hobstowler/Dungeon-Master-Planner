import React, { useEffect, useState } from "react";
import TableForm from "./TableForm";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default function Table({refreshData, data, metadata, setError, reg, intersection, showDetail, setShowDetail, setDetail}) {
    const [editId, setEditId] = useState(-1)
    const [formData, setFormData] = useState([])
    const [header, setHeader] = useState([])
    const [fkData, setFkData] = useState([])
    const [tableLoad, setTableLoadMessage] = useState("Loading Table...")
    const [timerId, setTimerId] = useState('')
    const dataDisplayTimer = () => setTimeout(() => {
        setTableLoadMessage("No data to display.")
    }, 2000)
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

    useEffect(() => {
        setTimerId(dataDisplayTimer())
        if (setShowDetail !== undefined) {
            setShowDetail(false)
        }
    }, [])
    useEffect(() => {
        if (data !== undefined && data.length > 0) {
            clearTimeout(timerId)
            compileHeader()
        }
        getFkData()
    }, [data])
    useEffect(() => {
        if (editId >= 0) {
            setFormData(data[editId])
        } else {
            setFormData([])
        }
    },[editId])

    return (
        <table cellSpacing={5}>
            <thead>
                <TableHeader header={header} />
            </thead>
            <tbody>
            {(data.length === 0) ? <tr><td colSpan={metadata.length + 2}>{tableLoad}</td></tr> :
                    data.map((row, i) => <TableRow
                        dataRow={row}
                        fkData={fkData}
                        metadata={metadata}
                        editId={editId}
                        setEditId={setEditId}
                        refreshData={refreshData}
                        tid={i}
                        active={i === editId}
                        intersection={intersection}
                        showDetail={showDetail}
                        setShowDetail={setShowDetail}
                        setDetail={setDetail}
                        key={i} />)}
                <tr><td id={editId >= 0 ? 'formEdit' : 'formAddNew'} colSpan={3}>{editId >= 0 ?
                    'Edit:' :
                    `Add new ${metadata.length > 0 ? `${metadata[0].TABLE_NAME.slice(0, metadata[0].TABLE_NAME.length - 1).replaceAll('_', ' ')}:` : null}`}</td></tr>
                <TableForm
                    meta={metadata}
                    rowData={formData}
                    regex={reg}
                    editId={editId}
                    setEditId={setEditId}
                    setError={setError}
                    refreshData={refreshData} />
            </tbody>
        </table>
    )
}