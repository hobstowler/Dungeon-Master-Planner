import React, {useEffect, useState} from 'react';
import Table from '../components/Table';

export default function ScenariosHasItems({reg, refreshData, data, metadata, setError, showDetail, setShowDetail}) {
    useEffect(() => {
        refreshData('scenarios_has_items', undefined)
    }, [])

    if (data !== undefined && metadata !== undefined) {
        return (
            <div>
                <h3>View the data of all scenario-item relationships in the table below, and use Edit, Delete, or Add New to modify the table.</h3>
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