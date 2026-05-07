import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/funcionario">Meu Perfil</Link></li>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/trilhas">Trilhas</Link></li>
        <li><Link to="/certificados">Certificados</Link></li>
        <li><Link to="/rh">Gestão (RH)</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;