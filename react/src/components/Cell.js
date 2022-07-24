import React, { useEffect, useState } from "react"

export default function Cell({fkData, metadata, i, value}) {
    const [val, setVal] = useState(value)
    const [fks, setFks] = useState(fkData)

    useEffect(() => {
        getVal()
    },[fkData])

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