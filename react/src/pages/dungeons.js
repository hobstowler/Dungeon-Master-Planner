import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import EditForm from '../components/EditForm';

export default function Dungeons({reg, refreshData, data, metadata}) {
    useEffect(() => {
        refreshData('dungeons', undefined)
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