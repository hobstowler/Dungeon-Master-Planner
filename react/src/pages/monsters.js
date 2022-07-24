import React, {useEffect} from 'react';
import Table from '../components/Table';

export default function Monster({reg, refreshData, data, metadata}) {
    useEffect(() => {
        refreshData('monsters', undefined)
    }, [])

    if (data !== undefined && metadata !== undefined) {
        return (
            <div>
                <Table data={data} metadata={metadata} refreshData={refreshData} reg={reg}/>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}