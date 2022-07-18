import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import EditForm from '../components/EditForm';

export default function DungeonHasMonsters({reg}) {
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
        })
        .catch(error => console.log(error))
    }, [])


    return(
        <div>
            <Table data={data} meta={metadata} reg={reg} />
            <EditForm meta={metadata} reg={reg} />
        </div>
    )
}