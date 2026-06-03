import React from 'react';
import { NavLink } from 'react-router-dom'; 
import '../styles/NavBar.css'; 
import { useAuth } from '../context/AuthContext';

function NavBar() {
  // 1. Puxamos o usuario do Contexto Global
  const { usuario, logoutGlobal } = useAuth();

  // Se não houver usuário logado (ex: na tela de Login), a barra não aparece
  if (!usuario) {
    return null;
  }

  // 2. CORREÇÃO: Descobre o cargo real de dentro do objeto purificado ('RH' ou 'ADS')
  const cargo = usuario?.cargo;

  return (
    <nav className="navbar">
      {/* Exibe uma tag especial se for do setor de RH */}
      {cargo === "RH" && (
        <span className="admin-tag">Administrador (RH)</span>
      )}

      <ul className="navbar-links">
        
        {/* 3. CORREÇÃO: Menu visível para o cargo 'ADS' */}
        {cargo === "ADS" && (
          <>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/funcionario">Meu Perfil</NavLink></li>
            <li><NavLink to="/certificados">Certificados</NavLink></li>
          </>
        )}
        
        {/* 4. CORREÇÃO: Menu visível para o cargo 'RH' */}
        {cargo === "RH" && (
          <>
            <li><NavLink to="/funcionario">Meu Perfil</NavLink></li>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/rh">Gestão (RH)</NavLink></li>
            <li><NavLink to="/novo-colaborador">Novo Colaborador</NavLink></li>
            <li><NavLink to="/certificados">Certificados</NavLink></li>
          </>
        )}

      </ul>

      <div className="nav-user-details" style={{ marginRight: '15px', color: '#ccc' }}>
        Olá, <strong>{usuario?.name}</strong>
      </div>

      <li><NavLink to="/" onClick={logoutGlobal}>Sair da conta</NavLink></li>
    </nav>
  );
}

export default NavBar;