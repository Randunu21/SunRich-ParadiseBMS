import React from 'react';
import Header from './components/Header';
import AddInventory from './components/AddInventory'
import{BrowserRouter as Router, Route,Routes } from "react-router-dom"

function App() {
  return (
    <Router>
      <Header />
        <Routes>
            <Route path="/add" element={<AddInventory />} />
        </Routes>
    </Router>

  );
}

export default App;

