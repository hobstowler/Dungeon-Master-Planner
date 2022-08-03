import React, {useEffect, useState} from 'react';
import Table from '../components/Table';

export default function DungeonHasMonsters({reg, refreshData, data, metadata, setError, showDetail, setShowDetail}) {
    useEffect(() => {
        refreshData('dungeons_has_monsters', undefined)
    }, [])

    if (data !== undefined && metadata !== undefined) {
        return (
            <div>
                <Table data={data}
                       metadata={metadata}
                       refreshData={refreshData}
                       setError={setError}
                       reg={reg}
                       showDetail={showDetail}
                       setShowDetail={setShowDetail} />
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}