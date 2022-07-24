import React, {useEffect} from 'react';
import Table from '../components/Table';

export default function Items({reg, refreshData, data, metadata}) {
    useEffect(() => {
        refreshData('items', undefined)
    }, [])

    if (data !== undefined && metadata !== undefined) {
        return (
            <div>
                <h3>View the data of all items in the table below, and use Edit, Delete, or Add New to modify the table.</h3>
                <Table data={data} metadata={metadata} refreshData={refreshData} reg={reg}/>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}