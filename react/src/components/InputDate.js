import React, { useEffect, useState } from "react";

// Controls for a date input
export default function InputDate({cell, datum, changeData, keyVal}) {
    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [day, setDay] = useState()

    // When underlying data changes, rebuild the date and call changeData()
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
        let new_year = e.target.value
        new_year = (new_year < 1) ? 1 : new_year
        setYear(new_year)
        changeData(keyVal, `${new_year}-${month}-${day}`)
    }
    const monthChange = (e) => {
        let new_month = e.target.value
        new_month = (new_month < 1) ? 1 : new_month
        new_month = (new_month > 12) ? 12 : new_month
        setMonth(new_month)
        changeData(keyVal, `${year}-${new_month}-${day}`)
    }
    const dayChange = (e) => {
        let new_day = e.target.value
        new_day = (new_day < 1) ? 1 : new_day
        new_day = (new_day > 31) ? 31 : new_day
        setDay(new_day)
        changeData(keyVal, `${year}-${month}-${new_day}`)
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