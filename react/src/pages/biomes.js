import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import EditForm from '../components/EditForm';

export default function Biomes({reg}) {
    const [data, setData] = useState([])
    const [metadata, setMetadata] = useState([])


    useEffect(() => {
        console.log('hello')
        fetch('/biomes', {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(json => {
            setData(json.data)
            setMetadata(json.metadata)
            console.log(json.metadata)
        })
        .catch(error => console.log(error))
    }, [])


    return(
        <div>
            <h2 id='tableName'>{(metadata.length > 0) ? metadata[0].TABLE_NAME : '<<Loading>>'} Table</h2>
            <Table data={data} meta={metadata} reg={reg} />
        </div>
    )
}