import React, {useEffect} from 'react';
import Table from '../components/Table';

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