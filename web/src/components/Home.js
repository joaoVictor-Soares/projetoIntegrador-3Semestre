import React from 'react';
import NavBar from '../navbar/NavBar';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <NavBar />
      <main className="home-content">
        <h1 className="home-title">Bem Vindo!</h1>
        <p className="home-subtitle">
          Pesquise o curso desejado da Microsoft para realizar!
        </p>
        <div className="search-bar">
          <input type="text" placeholder="Buscar cursos..." />
          <button>Buscar</button>
        </div>
      </main>
    </div>
  );
}

export default Home;