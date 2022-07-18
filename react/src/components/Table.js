import React, { useEffect, useState } from "react";
import TableForm from "./TableForm";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import EditForm from "./EditForm";

export default function Table({data, meta}) {
    const [rowData, setRowData] = useState([])
    const [metaData, setMetadata] = useState([])
    const reg_varchar = new RegExp('varchar*')
    const reg_text = new RegExp('text*')
    const reg_int = new RegExp('int*')
    const reg_dec = new RegExp('decimal*')
    const reg = {
        'char': reg_varchar,
        'text': reg_text,
        'int': reg_int,
        'dec': reg_dec
    }

    useEffect(() => {
        if (data !== undefined){
            setRowData(data)
        }
        if (meta !== undefined) {
            setMetadata(meta)
        }
    }, [data, meta])

    return (
        <table cellSpacing={0}>
            <thead>
                <TableHeader meta={metaData} />
            </thead>
            <tbody>
                {rowData.map((row, i) => <TableRow key={i} dataRow={row} />)}
                <TableForm meta={metaData} reg={reg} />
                <EditForm meta={metaData} reg={reg} />
            </tbody>
        </table>
    )
}