import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css'; 

function NavBar({ userRole }) {
  const navigate = useNavigate();

  const handleSair = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* NOVO: Texto que aparece apenas para o administrador no canto esquerdo */}
      {userRole === "admin" && (
        <span className="admin-tag">Administrador</span>
      )}

      <ul className="navbar-links">
        <li><Link to="/funcionario">Meu Perfil</Link></li>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/certificados">Certificados</Link></li>
        
        {userRole === "admin" && (
          <li><Link to="/rh">Gestão (RH)</Link></li>
        )}
      </ul>

      <button className="btn-voltar-login" onClick={handleSair}>
        Voltar para o Login
      </button>
    </nav>
  );
}

export default NavBar;