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
      {/* Texto que aparece apenas para o administrador no canto esquerdo */}
      {userRole === "admin" && (
        <span className="admin-tag">Administrador</span>
      )}

      <ul className="navbar-links">
        
        {/* NOVO: Estas abas AGORA só aparecem se o utilizador for "user" (Funcionário normal) */}
        {userRole === "user" && (
          <>
            <li><Link to="/funcionario">Meu Perfil</Link></li>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/certificados">Certificados</Link></li>
          </>
        )}
        
        {/* Estas abas só aparecem se o utilizador for "admin" */}
        {userRole === "admin" && (
          <>
            <li><Link to="/rh">Gestão de Funcionários</Link></li>
            <li><Link to="/novo-colaborador">Novo Colaborador</Link></li>
          </>
        )}

      </ul>

      <button className="btn-voltar-login" onClick={handleSair}>
        Voltar para o Login
      </button>
    </nav>
  );
}

export default NavBar;