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
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div className="App">
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/biomes" element={<Biomes />} />
            <Route path="/dungeon_masters" element={<DungeonMasters />} />
            <Route path="/dungeons" element={<Dungeons />} />
            <Route path="/dungeons_has_monsters" element={<DungeonsHasMonsters />} />
            <Route path="/items" element={<Items />} />
            <Route path="/monsters" element={<Monsters />} />
            <Route path="/scenarios" element={<Scenarios />} />
            <Route path="/scenarios_has_items" element={<ScenariosHasItems />} />
            <Route path="/types" element={<Types />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
