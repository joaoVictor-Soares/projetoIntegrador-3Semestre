import React, { useState } from 'react';
import '../styles/Funcionario.css';

function Roadmap() {
  const [trilhasDisponiveis] = useState([
    { id: 1, titulo: "Microsoft Azure Fundamentals", categoria: "Cloud", duracao: "12h" },
    { id: 2, titulo: "Power Platform Functional Consultant", categoria: "Ferramentas", duracao: "20h" },
    { id: 3, titulo: "Desenvolvimento Frontend Avançado", categoria: "Programação", duracao: "40h" }
  ]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Trilhas Disponíveis (Roadmap)</h1>
      <p style={{ marginBottom: '20px' }}>Explore novos caminhos e adicione à sua jornada de aprendizado.</p>

      <div className="trilhas-grid">
        {trilhasDisponiveis.map(trilha => (
          <div key={trilha.id} className="card">
            <h3>{trilha.titulo}</h3>
            <div className="user-info">
              <p><strong>Categoria:</strong> {trilha.categoria}</p>
              <p><strong>Duração Estimada:</strong> {trilha.duracao}</p>
            </div>
            <button style={{
              marginTop: '15px', padding: '10px', backgroundColor: 'transparent',
              color: '#85a5ff', border: '2px solid #85a5ff', borderRadius: '6px',
              fontWeight: 'bold', cursor: 'pointer', width: '100%'
            }}>
              Iniciar Trilha
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Roadmap;