import React from 'react';
import {Link} from "react-router-dom";

export default function NavBar({clearData}) {
    return (
        <nav>
            <Link to="/" onClick={clearData} >Home</Link>
            <Link to="/dungeon_masters" onClick={clearData} >Dungeon Masters</Link>
            <Link to="/scenarios" onClick={clearData} >Scenarios</Link>
            <Link to="/dungeons" onClick={clearData} >Dungeons</Link>
            <Link to="/monsters" onClick={clearData} >Monsters</Link>
            <Link to="/items" onClick={clearData} >Items</Link>
            <Link to="/biomes" onClick={clearData} >Biomes</Link>
            <Link to="/types" onClick={clearData} >Types</Link>
        </nav>
    )
}