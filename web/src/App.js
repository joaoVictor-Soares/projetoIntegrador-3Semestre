import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './components/Home';
import Funcionario from './pages/Funcionario';
import RH from './pages/RH';
import NavBar from './navbar/NavBar';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/funcionario" element={<><NavBar /><Funcionario /></>} />
        <Route path="/rh" element={<><NavBar /><RH /></>} />
      </Routes>
    </Router>
  );
}

export default App;