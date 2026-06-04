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

  // 2. Descobre o cargo real de dentro do objeto purificado ('RH' ou 'ADS')
  const cargo = usuario?.cargo;

  return (
    <nav className="navbar">
      
      {/* LADO ESQUERDO */}
      <div className="navbar-left">
        {cargo === "RH" && (
          <span className="admin-tag">Administrador (RH)</span>
        )}
      </div>

      {/* CENTRO: Links de Navegação */}
      <ul className="navbar-links">
        
        {/* Menu visível para o cargo 'ADS' */}
        {cargo === "ADS" && (
          <>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/funcionario">Meu Perfil</NavLink></li>
            <li><NavLink to="/certificados">Certificados</NavLink></li>
          </>
        )}
        
        {/* Menu visível para o cargo 'RH' */}
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

      {/* LADO DIREITO: Apenas o botão de sair */}
      <div className="navbar-right">
        <NavLink to="/" className="btn-sair" onClick={logoutGlobal}>
          Sair da conta
        </NavLink>
      </div>

    </nav>
  );
}

export default NavBar;