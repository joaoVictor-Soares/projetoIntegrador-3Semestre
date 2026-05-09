import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Trocamos Link por NavLink
import '../styles/NavBar.css'; 

function NavBar({ userRole }) {
  const navigate = useNavigate();

  const handleSair = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      {userRole === "admin" && (
        <span className="admin-tag">Administrador</span>
      )}

      <ul className="navbar-links">
        
        {/* Usamos NavLink no lugar de Link */}
        {userRole === "user" && (
          <>
            <li><NavLink to="/funcionario">Meu Perfil</NavLink></li>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/certificados">Certificados</NavLink></li>
          </>
        )}
        
        {userRole === "admin" && (
          <>
            <li><NavLink to="/rh">Gestão (RH)</NavLink></li>
            <li><NavLink to="/novo-colaborador">Novo Colaborador</NavLink></li>
          </>
        )}

      </ul>

      <button className="btn-voltar-login" onClick={handleSair}>
        Sair da Conta
      </button>
    </nav>
  );
}

export default NavBar;