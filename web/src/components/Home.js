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

      </div>
    </div>
  );
}

export default Home;