import React, { useEffect, useState } from 'react';

export default function TableHeader({header}) {
    const [head, setHead] = useState([])

    useEffect(() => {
        if (header.length > 0) {
            setHead(header)
        }
    }, [header])

    return(
        <tr>
            {head.map((display, i) => <th key={i}>{display}</th>)}
            {(header.length > 0) ? <th>Edit</th> : ''}
            {(header.length > 0) ? <th>Delete</th> : ''}
        </tr>
    )
}