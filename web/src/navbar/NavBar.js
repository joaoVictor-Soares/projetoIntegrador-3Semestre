import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; 
import '../styles/NavBar.css'; 
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const { usuario, logoutGlobal } = useAuth();
  const [scrollPos, setScrollPos] = useState(0);

  const limiteRolagem = 350;
  const alturaNavbar = 65; // Altura da sua barra em pixels

  useEffect(() => {
    let frameId;
    const handleScroll = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        setScrollPos(window.scrollY);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  if (!usuario) {
    return null;
  }

  const cargo = usuario?.cargo;

  // CÁLCULO OTIMIZADO: Impede que o número suba infinitamente. 
  // Ele esconde exatamente a altura da barra (-65px) e trava ali.
  let deslocamento = 0;
  if (scrollPos > limiteRolagem) {
    deslocamento = Math.max(-(scrollPos - limiteRolagem), -alturaNavbar);
  }

  return (
    <>
      {/* Espaçador para evitar o pulo do conteúdo abaixo */}
      <div style={{ height: `${alturaNavbar}px` }}></div>

      <nav 
        className="navbar"
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          left: 0,
          zIndex: 1000,
          boxSizing: 'border-box',
          transform: `translateY(${deslocamento}px)`,
          boxShadow: scrollPos > 10 ? '0 4px 10px rgba(0, 0, 0, 0.15)' : 'none',
          transition: 'box-shadow 0.3s ease'
        }}
      >
        
        {/* LADO ESQUERDO: Tag de identificação */}
        <div className="navbar-left">
          {cargo === "RH" && (
            <span className="admin-tag">Administrador (RH)</span>
          )}
        </div>

        {/* CENTRO: Links de Navegação Dinâmicos */}
        <ul className="navbar-links">
          {cargo === "ADS" && (
            <>
              <li><NavLink to="/home">Home</NavLink></li>
              <li><NavLink to="/funcionario">Meu Perfil</NavLink></li>
              <li><NavLink to="/certificados">Certificados</NavLink></li>
            </>
          )}
          
          {cargo === "RH" && (
            <>
              <li><NavLink to="/home">Home</NavLink></li>
              <li><NavLink to="/funcionario">Meu Perfil</NavLink></li>
              <li><NavLink to="/rh">Gestão (RH)</NavLink></li>
              <li><NavLink to="/novo-colaborador">Novo Colaborador</NavLink></li>
              <li><NavLink to="/certificados">Certificados</NavLink></li>
            </>
          )}
        </ul>

        {/* LADO DIREITO: Botão único e limpo de Sair */}
        <div className="navbar-right">
          <NavLink to="/" className="btn-sair" onClick={logoutGlobal}>
            Sair da conta
          </NavLink>
        </div>

      </nav>
    </>
  );
}

export default NavBar;