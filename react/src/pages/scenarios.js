import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import EditForm from '../components/EditForm';

export default function Scenarios({reg, refreshData, data, metadata}) {
    useEffect(() => {
        refreshData('scenarios')
    }, [])

    if (data !== undefined && metadata !== undefined) {
        return (
            <div>
                <h2 id='tableName'>{(metadata.length > 0) ? metadata[0].TABLE_NAME : '<<Loading>>'} Table</h2>
                <Table data={data} metadata={metadata} refreshData={refreshData} reg={reg}/>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}