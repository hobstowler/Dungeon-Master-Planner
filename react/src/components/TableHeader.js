import React, { useEffect, useState } from 'react';

export default function TableHeader({meta}) {
    const [metaData, setMetadata] = useState([])

    useEffect(() => {
        if (meta !== undefined) {
            setMetadata(meta)
        }
    }, [meta])

    return(
        <tr>{metaData.map((data) => <th key={data.COLUMN_NAME}>{data.COLUMN_NAME}</th>)}</tr>
    )
}