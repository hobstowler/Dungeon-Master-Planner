import React, { useEffect, useState } from "react";

export default function InputDate({cell, datum, changeData, keyVal}) {
    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [day, setDay] = useState()

    useEffect(() => {
        if (datum !== undefined && typeof datum === 'string') {
            let date_comp = datum.split('-')
            setYear(date_comp[0])
            setMonth(date_comp[1])
            setDay(date_comp[2])
        } else {
            setYear('')
            setMonth('')
            setDay('')
            changeData(keyVal, '')
        }
    },[datum])

    const yearChange =(e) => {
        setYear(e.target.value)
        changeData(keyVal, `${e.target.value}-${month}-${day}`)
    }
    const monthChange = (e) => {
        setMonth(e.target.value)
        changeData(keyVal, `${year}-${e.target.value}-${day}`)
    }
    const dayChange = (e) => {
        setDay(e.target.value)
        changeData(keyVal, `${year}-${month}-${e.target.value}`)
    }

    return (
        <td id='date'>
            [
            <input type='number' id='year' maxLength={4} onChange={yearChange} value={year} />/
            <input type='number' id='month' maxLength={2} onChange={monthChange} value={month} />/
            <input type='number' id='day' maxLength={2} onChange={dayChange} value={day} />
            ]
        </td>
    )
}