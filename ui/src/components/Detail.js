import React, { useEffect, useState } from "react";
import DetailTable from "./DetailTable";

// detail pane for intersection table views
export default function Detail({detailInfo, setError, reg}) {
    const [data, setData] = useState([])
    const [metadata, setMetadata] = useState([])

    useEffect(() => {
        if (detailInfo === undefined) {}
        refreshData()
    }, [detailInfo])

    // populates data for the table
    const refreshData = () => {
        setData([])
        fetch(`/${detailInfo.url}/${detailInfo.id}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(json => {
                setData(json.data)
                setMetadata(json.metadata)
            })
            .catch(error => console.log(error))
    }

    // fake constants to allow reusing of components
    const showDetail = false
    const setShowDetail = () => {
        //do nothing
    }

    // don't render if there's no data
    if (data !== undefined && metadata !== undefined) {
        return (
            <div>
                <h3>Detail view for {detailInfo.name}</h3>
                <DetailTable data={data}
                       metadata={metadata}
                       refreshData={refreshData}
                       setError={setError}
                       reg={reg}
                       detailInfo={detailInfo}
                       showDetail={showDetail}
                       setShowDetail={setShowDetail}/>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}