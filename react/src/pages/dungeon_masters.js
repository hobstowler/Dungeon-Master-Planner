import React, {useEffect} from 'react';
import Table from '../components/Table';

export default function DungeonMasters({reg, refreshData, data, metadata, setError}) {
    useEffect(() => {
        refreshData('dungeon_masters')
    }, [])

    return(
        <div>
            <h3>View the data of all dungeon masters in the table below, and use Edit, Delete, or Add New to modify the table.</h3>
            <Table data={data} metadata={metadata} refreshData={refreshData} setError={setError} reg={reg}/>
        </div>
    )
}