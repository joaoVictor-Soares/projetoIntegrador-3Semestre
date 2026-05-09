import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './components/Home';
import Funcionario from './pages/Funcionario';
import RH from './pages/RH';
import NavBar from './navbar/NavBar';
import Certificate from './components/Certificate';
import NovoColaborador from './pages/NovoColaborador'; // Adicionei a sua nova página aqui!
import './styles/App.css';

function App() {
  const [listaCertificadosGlobal, setListaCertificadosGlobal] = useState([]);
  const [meuProgresso, setMeuProgresso] = useState(0); 
  
  // 1. Ao invés de começar sempre como "user", ele tenta ler a memória do navegador primeiro
  const [userRole, setUserRole] = useState(() => {
    const cargoSalvo = localStorage.getItem("userRole");
    return cargoSalvo ? cargoSalvo : "user";
  });

  // 2. Sempre que o userRole mudar (quando fizer login), guarda na memória do navegador
  useEffect(() => {
    localStorage.setItem("userRole", userRole);
  }, [userRole]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserRole={setUserRole} />} />
        <Route path="/home" element={<><NavBar userRole={userRole} /><Home /></>} />
        
        {/* Passamos o progresso e a função de atualizar para o Perfil */}
        <Route path="/funcionario" element={
          <><NavBar userRole={userRole} /><Funcionario progresso={meuProgresso} setProgresso={setMeuProgresso} /></>
        } />
        
        {/* Passamos apenas o valor do progresso para o RH poder visualizar */}
        <Route path="/rh" element={
          <><NavBar userRole={userRole} /><RH progressoFuncionario={meuProgresso} certificados={listaCertificadosGlobal} /></>
        } />

        <Route path="/novo-colaborador" element={
          <><NavBar userRole={userRole} /><NovoColaborador /></>
        } />
        
        <Route path="/certificados" element={
          <><NavBar userRole={userRole} /><Certificate certificados={listaCertificadosGlobal} setCertificados={setListaCertificadosGlobal} /></>
        } />
      </Routes>
    </Router>
  );
}

export default App;