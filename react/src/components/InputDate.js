import React, { useEffect, useState } from "react";

export default function InputDate(cell, datum, changeData, keyVal) {
    const [date, changeDate] = useState('')
    const [year, setYear] = useState(2022)
    const [month, setMonth] = useState(1)
    const [day, setDay] = useState(1)

    useEffect(() => {
        changeDate(datum)
    }, [datum])

    const yearChange =(e) => {
        setYear(e.target.value)
    }
    const monthChange = (e) => {
        setMonth(e.target.value)
    }
    const dayChange = (e) => {
        setDay(e.target.value)
    }

    return (
        <td id='date'>
            <input type='number' id='year' maxLength={4} onChange={yearChange} value={year} />
            <input type='number' id='month' maxLength={2} onChange={monthChange} month={month} />
            <input type='number' id='day' maxLength={2} onChange={dayChange} day={day} />
        </td>
    )
}