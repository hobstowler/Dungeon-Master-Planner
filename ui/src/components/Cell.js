import React, { useEffect, useState } from "react"

// Cell in a table. called within <td> tags
export default function Cell({fkData, metadata, i, value}) {
    const [val, setVal] = useState(value)
    const [fks, setFks] = useState(fkData)  // foreign key information

    useEffect(() => {
        getVal()
    },[fkData])

    // checks to see if the ID is in the FK data and changes to the matches value. Check occurs if the column metadata indicates FK
    const getVal = () => {
        if (metadata.COLUMN_KEY === 'MUL' && i in fks) {
            if (val in fks[i]) {
                setVal(fks[i][val])
            }
        }
    }

    return (
        <span>{val}</span>
    )
}