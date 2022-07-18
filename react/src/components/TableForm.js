import React, { useState, useEffect } from "react"

import TableFormCell from "./TableFormCell"

export default function TableForm({meta, reg}) {
    const [metaData, setMetadata] = useState([])

    useEffect(() => {
        if (meta !== undefined) {
            setMetadata(meta)
        }
    }, [meta])

    return (
        <tr>{meta.map((cell, i) => <TableFormCell cell={cell} reg={reg} />)}</tr>
    )
}