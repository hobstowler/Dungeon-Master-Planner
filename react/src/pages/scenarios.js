import { useState, useEffect } from 'react';
import Table from '../components/Table';

export default function Scenarios() {
    const [data, setData] = useState([])
    const [metadata, setMetadata] = useState([])
    useEffect(() => {
        console.log('hello')
        fetch('/scenarios', {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(json => {
            setData(json.data)
            setMetadata(json.metadata)
        })
        .catch(error => console.log(error))
    }, [])


    return(
        <div>
            <h2>Scenarios Table</h2>
            <Table data={data} meta={metadata} />
        </div>
    )
}