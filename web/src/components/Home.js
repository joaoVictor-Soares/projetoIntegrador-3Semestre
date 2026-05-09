import React from 'react';
import '../styles/Home.css'; 

function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-content">
        
        <h1 className="home-title">Bem Vindo!</h1>
        <p className="home-subtitle">Pesquise o curso desejado da Microsoft para realizar!</p>
        
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Buscar cursos..." 
          />
          <button className="search-button">
            Buscar
          </button>
        </div>

        {/* NOVO: Secção de Cursos movida para a Home */}
        <div className="cursos-disponiveis-section">
          <h2 className="section-subtitle">Novos Cursos Disponíveis</h2>
          
          <div className="cursos-grid">
            
            <div className="curso-novo-card">
              <h4>Python e IoT na Indústria</h4>
              <p className="curso-info">Aprenda a integrar sensores e equipamentos usando Python e protocolos industriais.</p>
              <span className="curso-carga">Carga horária: 40h</span>
              <button className="btn-inscrever">Inscrever-se</button>
            </div>

            <div className="curso-novo-card">
              <h4>Arquitetura de Software em Java</h4>
              <p className="curso-info">Padrões de projeto, microsserviços e boas práticas para sistemas escaláveis.</p>
              <span className="curso-carga">Carga horária: 60h</span>
              <button className="btn-inscrever">Inscrever-se</button>
            </div>

            <div className="curso-novo-card">
              <h4>Redes Industriais e Profibus</h4>
              <p className="curso-info">Fundamentos de comunicação em chão de fábrica e automação.</p>
              <span className="curso-carga">Carga horária: 20h</span>
              <button className="btn-inscrever">Inscrever-se</button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;