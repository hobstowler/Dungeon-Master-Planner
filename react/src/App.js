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

  return (
    <div className="App">
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/biomes" element={<Biomes reg={reg}/>} />
            <Route path="/dungeon_masters" element={<DungeonMasters reg={reg} />} />
            <Route path="/dungeons" element={<Dungeons reg={reg} />} />
            <Route path="/dungeons_has_monsters" element={<DungeonsHasMonsters reg={reg} />} />
            <Route path="/items" element={<Items reg={reg} />} />
            <Route path="/monsters" element={<Monsters reg={reg} />} />
            <Route path="/scenarios" element={<Scenarios reg={reg} />} />
            <Route path="/scenarios_has_items" element={<ScenariosHasItems reg={reg} />} />
            <Route path="/types" element={<Types reg={reg} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
