import React, { useEffect, useState } from "react"

export default function Cell({fkData, i, value}) {
    const [val, setVal] = useState(value)
    const [fks, setFks] = useState(fkData)

    useEffect(() => {
        getVal()
        //setTimeout(getVal, 500)
    },[fkData])

    const getVal = () => {
        if (i in fks) {
            if (val in fks[i]) {
                setVal(fks[i][val])
            }
        }
    }

    return (
        <span>{val}</span>
    )
}