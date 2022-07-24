import React, {useEffect} from 'react';
import Table from '../components/Table';

export default function Scenarios({reg, refreshData, data, metadata}) {
    useEffect(() => {
        refreshData('scenarios')
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