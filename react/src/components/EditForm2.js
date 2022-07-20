import React, { useEffect, useState } from "react";

import EditFormCell2 from "./EditFormCell2"

export default function EditForm2({meta, reg}) {
    const [metaData, setMetadata] = useState([])

    useEffect(() => {
        if (meta !== undefined) {
            setMetadata(meta)
        }
    }, [meta])

    return (
        <tr id="update">
            {meta.map((cell, i) => <EditFormCell2 cell={cell} reg={reg} />)}
        </tr>
    )
}