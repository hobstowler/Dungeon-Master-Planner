import React, { useState } from "react"

// a search bar to filter data by name field
export default function SearchForm({refreshData}) {
    const [value, setValue] = useState('')

    // handles value changes from input
    const handleChange = (e) => {
        setValue(e.target.value)
    }

    // calls to refresh data with filter
    const search = (e) => {
        e.preventDefault()
        refreshData(undefined, value)
    }

    // clears the filter and refreshes the data.
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