import React, { useEffect, useState } from "react";

import EditFormCell from "./EditFormCell"

export default function EditForm({meta, reg}) {
    const [metaData, setMetadata] = useState([])

    useEffect(() => {
        if (meta !== undefined) {
            setMetadata(meta)
        }
    }, [meta])

    return (
        <form method="POST" id="EditForm">
            <label>Test</label>
            {meta.map((cell, i) => <EditFormCell cell={cell} reg={reg} />)}
        </form>
    )
}