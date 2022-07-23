import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import EditForm from '../components/EditForm';

export default function DungeonMasters({reg, refreshData, data, metadata}) {
    useEffect(() => {
        refreshData('dungeon_masters')
    }, [])

    return(
        <div>
            <Table data={data} metadata={metadata} refreshData={refreshData} reg={reg}/>
        </div>
    )
}