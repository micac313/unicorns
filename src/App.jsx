import { useState, useEffect } from "react";
import ObjectsContainer from "./layouts/objects";
import { Routes, Route, Link } from 'react-router-dom';
import UnicornsContainer from './unicorns/UnicornsContainer';
import 'primeicons/primeicons.css';



function App() {

  return (
    <>
      <nav>
        <Link to="/unicorns">🦄 Ver Unicornios</Link>
      </nav>
      <Routes>
        <Route path="/unicorns" element={<UnicornsContainer />} />
      </Routes>
    </>
  );
}

export default App;
