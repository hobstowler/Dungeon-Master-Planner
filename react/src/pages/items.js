import React, {useEffect} from 'react';
import Table from '../components/Table';

export default function Items({reg, refreshData, data, metadata}) {
    useEffect(() => {
        refreshData('items', undefined)
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