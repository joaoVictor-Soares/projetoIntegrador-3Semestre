import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './components/Home';
import Funcionario from './pages/Funcionario';
import RH from './pages/RH';
import NavBar from './navbar/NavBar';
import Certificate from './components/Certificate';
import './styles/App.css';

function App() {
  const [listaCertificadosGlobal, setListaCertificadosGlobal] = useState([]);
  const [userRole, setUserRole] = useState("user");
  
  // NOVO: Estado para guardar a porcentagem de progresso do curso (Começa em 0%)
  const [meuProgresso, setMeuProgresso] = useState(0); 

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
          <><NavBar userRole={userRole} /><RH progressoFuncionario={meuProgresso} /></>
        } />
        
        <Route path="/certificados" element={
          <><NavBar userRole={userRole} /><Certificate certificados={listaCertificadosGlobal} setCertificados={setListaCertificadosGlobal} /></>
        } />
      </Routes>
    </Router>
  );
}

export default App;