import React, {useEffect} from 'react';
import Table from '../components/Table';

export default function Scenarios({reg, refreshData, data, metadata, setError, showDetail, setShowDetail, setDetailInfo}) {
    useEffect(() => {
        refreshData('scenarios')
    }, [])

    const setDetail = (id, name) => {
        let info = {
            'id': id,
            'tableName': 'Scenarios_Has_Items',
            'url': 'Scenarios_Has_Items',
            'columnName': 'scenario_id',
            'name': name
        }
        setDetailInfo(info)
    }

    if (data !== undefined && metadata !== undefined) {
        return (
            <div>
                <h3>View the data of all scenarios in the table below, and use Edit, Delete, or Add New to modify the table.</h3>
                <Table data={data}
                       metadata={metadata}
                       refreshData={refreshData}
                       setError={setError}
                       reg={reg}
                       intersection={'Scenarios_Has_Items'}
                       showDetail={showDetail}
                       setShowDetail={setShowDetail}
                       setDetail={setDetail} />
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}