import React, {useEffect} from 'react';
import Table from '../components/Table';

export default function Dungeons({reg, refreshData, data, metadata, setError, showDetail, setShowDetail}) {
    useEffect(() => {
        refreshData('dungeons', undefined)
    }, [])

    if (data !== undefined && metadata !== undefined) {
        return (
            <div>
                <h3>View the data of all dungeons in the table below, and use Edit, Delete, or Add New to modify the table.</h3>
                <Table data={data}
                       metadata={metadata}
                       refreshData={refreshData}
                       setError={setError}
                       reg={reg}
                       intersection={'Dungeons_Has_Monsters'}
                       showDetail={showDetail}
                       setShowDetail={setShowDetail} />
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}