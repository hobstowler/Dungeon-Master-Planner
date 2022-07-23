import React, { useState } from "react"

export default function SearchForm({refreshData}) {
    const [value, setValue] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value)
    }
    const search = (e) => {
        e.preventDefault()
        console.log('searching')
        refreshData(undefined, value)
    }
    const clear = () => {
        refreshData()
        setValue('')
    }
    return (
        <form>
            <input type='text' id='nameSearch' onChange={handleChange} value={value} />
            <input type='submit' value='Search by Name' onClick={search} />
            <input type='button' value='Clear' onClick={clear} />
        </form>
    )
}