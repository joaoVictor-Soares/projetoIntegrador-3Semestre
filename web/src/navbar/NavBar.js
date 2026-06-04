import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; 
import '../styles/NavBar.css'; 
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const { usuario, logoutGlobal } = useAuth();
  const [scrollPos, setScrollPos] = useState(0);

  const limiteRolagem = 350;

  useEffect(() => {
    // Truque para suavidade extrema: sincroniza a leitura da rolagem com os frames do monitor
    let frameId;
    const handleScroll = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        setScrollPos(window.scrollY);
      });
    };
    
    // O { passive: true } avisa o navegador que não vamos travar a rolagem, deixando-a mais rápida
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

  // CÁLCULO SUAVE: Se passou do limite, calcula exatemente quantos pixels deve empurrar para cima
  const deslocamento = scrollPos > limiteRolagem ? -(scrollPos - limiteRolagem) : 0;

  return (
    <>
      {/* O nosso espaçador mantém-se para evitar o "pulo" da página */}
      <div style={{ height: '65px' }}></div>

      <nav 
        className="navbar"
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          left: 0,
          zIndex: 1000,
          boxSizing: 'border-box',
          // A MÁGICA: A barra fica sempre fixa, mas a placa de vídeo desliza-a para cima
          transform: `translateY(${deslocamento}px)`,
          // Pequena sombra para ficar bonito
          boxShadow: scrollPos > 10 ? '0 4px 10px rgba(0, 0, 0, 0.15)' : 'none',
          transition: 'box-shadow 0.3s ease'
        }}
      >
        
        {/* LADO ESQUERDO */}
        <div className="navbar-left">
          {cargo === "RH" && (
            <span className="admin-tag">Administrador (RH)</span>
          )}
        </div>

        {/* CENTRO: Links de Navegação */}
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

        {/* LADO DIREITO: Botão de sair */}
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