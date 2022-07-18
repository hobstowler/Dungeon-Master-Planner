import React, { useEffect, useState } from "react";
import TableForm from "./TableForm";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default function Table({data, meta, reg}) {
    const [rowData, setRowData] = useState([])
    const [metaData, setMetadata] = useState([])


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
            </tbody>
        </table>
    )
}