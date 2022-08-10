import React from 'react';
import NavBar from './NavBar'

// header for each page
export default function Header({clearData}) {
    return (
        <div className='header'>
            <div className='headSpace'></div><h1>The Dungeon Master's Planner App</h1>
            <br /><NavBar clearData={clearData} />
        </div>
    )
}