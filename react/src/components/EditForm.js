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
        <div id="update">
            <form method="POST" id="EditForm">
                <legend>Update a row</legend>
                <fieldset>
                {meta.map((cell, i) => <EditFormCell cell={cell} reg={reg} />)}
                </fieldset>
                <input type="submit" value="Update Row" />
                <input type="button" value="Discard Changes" />
            </form>
        </div>
    )
}