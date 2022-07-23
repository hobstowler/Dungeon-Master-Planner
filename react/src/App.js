import logo from './logo.svg';
import './App.css';
import HomePage from './pages';
import Header from './components/Header'
import Biomes from './pages/biomes'
import DungeonMasters from './pages/dungeon_masters'
import Dungeons from './pages/dungeons'
import DungeonsHasMonsters from './pages/dungeons_has_monsters'
import Items from './pages/items'
import Monsters from './pages/monsters'
import Scenarios from './pages/scenarios'
import ScenariosHasItems from './pages/scenarios_has_items'
import Types from './pages/types'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import {useState} from "react";
import {tab} from "@testing-library/user-event/dist/tab";

function App() {
    const [data, setData] = useState([])
    const [metadata, setMetadata] = useState([])
    const reg_varchar = new RegExp('varchar*')
    const reg_text = new RegExp('text*')
    const reg_int = new RegExp('int*')
    const reg_dec = new RegExp('decimal*')
    const reg = {
        'char': reg_varchar,
        'text': reg_text,
        'int': reg_int,
        'dec': reg_dec
    }
    const refreshData = (tableName, nameFilter) => {
        let url = `/${tableName}`
        if (nameFilter !== undefined) {
            url += `?name=${nameFilter}`
        }
        fetch(url, {
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

    return (
        <div className="App">
            <div className="App">
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/biomes" element={<Biomes reg={reg} refreshData={refreshData} data={data} metadata={metadata} />}/>
                        <Route path="/dungeon_masters" element={<DungeonMasters reg={reg} refreshData={refreshData} data={data} metadata={metadata} />}/>
                        <Route path="/dungeons" element={<Dungeons reg={reg} refreshData={refreshData} data={data} metadata={metadata} />}/>
                        <Route path="/dungeons_has_monsters" element={<DungeonsHasMonsters reg={reg} refreshData={refreshData} data={data} metadata={metadata} />}/>
                        <Route path="/items" element={<Items reg={reg} refreshData={refreshData} data={data} metadata={metadata} />}/>
                        <Route path="/monsters" element={<Monsters reg={reg} refreshData={refreshData} data={data} metadata={metadata} />}/>
                        <Route path="/scenarios" element={<Scenarios reg={reg} refreshData={refreshData} data={data} metadata={metadata} />}/>
                        <Route path="/scenarios_has_items" element={<ScenariosHasItems reg={reg} refreshData={refreshData} data={data} metadata={metadata} />}/>
                        <Route path="/types" element={<Types reg={reg} refreshData={refreshData} data={data} metadata={metadata} />}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
