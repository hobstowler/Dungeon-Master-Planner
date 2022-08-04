import React, {useEffect} from 'react';
import Table from '../components/Table';

export default function Monster({reg, refreshData, data, metadata, setError, showDetail, setShowDetail, setDetailInfo}) {
    useEffect(() => {
        refreshData('monsters', undefined)
    }, [])

    const setDetail = (id, name) => {
        let info = {
            'id': id,
            'tableName': 'Dungeons_Has_Monsters',
            'url': 'Monsters_Has_Dungeons',
            'columnName': 'monster_id',
            'name': name
        }
        setDetailInfo(info)
    }

    if (data !== undefined && metadata !== undefined) {
        return (
            <div>
                <h3>View the data of all monsters in the table below, and use Edit, Delete, or Add New to modify the table.</h3>
                <Table data={data}
                       metadata={metadata}
                       refreshData={refreshData}
                       setError={setError}
                       reg={reg}
                       intersection={'Dungeons_Has_Monsters'}
                       showDetail={showDetail}
                       setShowDetail={setShowDetail}
                       setDetail={setDetail} />
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}