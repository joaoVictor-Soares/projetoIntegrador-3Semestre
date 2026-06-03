// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Importa o contexto que criamos

import Login from './pages/Login';
import Home from './components/Home';
import Funcionario from './pages/Funcionario';
import RH from './pages/RH';
import NavBar from './navbar/NavBar';
import Certificate from './components/Certificate';
import NovoColaborador from './pages/NovoColaborador'; 
import './styles/App.css';

function App() {
  const [listaCertificadosGlobal, setListaCertificadosGlobal] = useState([]);
  const [meuProgresso, setMeuProgresso] = useState(0); 

  return (
    <AuthProvider> {/* 1. O AuthProvider envolve todo o app aqui */}
      <Router>
        <Routes>
          {/* Não precisamos mais passar setUserRole como prop */}
          <Route path="/" element={<Login />} />
          
          {/* Note que o NavBar não precisa mais receber userRole={userRole} por aqui! */}
          <Route path="/home" element={<><NavBar /><Home /></>} />
          
          <Route path="/funcionario" element={
            <><NavBar /><Funcionario progresso={meuProgresso} setProgresso={setMeuProgresso} /></>
          } />
          
          <Route path="/rh" element={
            <><NavBar /><RH progressoFuncionario={meuProgresso} certificados={listaCertificadosGlobal} setCertificados={setListaCertificadosGlobal}/></>
          } />

          <Route path="/novo-colaborador" element={
            <><NavBar /><NovoColaborador /></>
          } />
          
          <Route path="/certificados" element={
            <><NavBar /><Certificate certificados={listaCertificadosGlobal} setCertificados={setListaCertificadosGlobal} /></>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;