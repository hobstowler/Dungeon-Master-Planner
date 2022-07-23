import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import EditForm from '../components/EditForm';

export default function DungeonMasters({reg, refreshData, data, metadata}) {
    useEffect(() => {
        refreshData('dungeon_masters')
    }, [])

    return(
        <div>
            <h2 id='tableName'>{(metadata.length > 0) ? metadata[0].TABLE_NAME : '<<Loading>>'} Table</h2>
            <Table data={data} metadata={metadata} refreshData={refreshData} reg={reg}/>
        </div>
    )
}