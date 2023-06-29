import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonData from './Pages/PokemonData';
import PokemonDetails from './Pages/PokemonDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonData />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
