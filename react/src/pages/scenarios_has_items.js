import React, {useEffect, useState} from 'react';
import Table from '../components/Table';

export default function ScenariosHasItems({reg, refreshData, data, metadata, setError}) {
    useEffect(() => {
        refreshData('scenarios_has_items', undefined)
    }, [])

    if (data !== undefined && metadata !== undefined) {
        return (
            <div>
                <Table data={data} metadata={metadata} refreshData={refreshData} setError={setError} reg={reg}/>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}