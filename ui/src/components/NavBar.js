import React from 'react';
import {Link} from "react-router-dom";

// Builds the navigation bar for each page.
export default function NavBar({clearData}) {
    return (
        <nav>
            <Link to="/" onClick={clearData} >Home</Link>
            <Link to="/dungeon_masters">Dungeon Masters</Link>
            <Link to="/scenarios">Scenarios</Link>
            <Link to="/dungeons">Dungeons</Link>
            <Link to="/monsters">Monsters</Link>
            <Link to="/items">Items</Link>
            <Link to="/biomes">Biomes</Link>
            <Link to="/types">Types</Link>
        </nav>
    )
}