import React from 'react';
import '../styles/Funcionario.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Análise de Desempenho</h1>
      
      <div className="card" style={{ marginBottom: '20px' }}>
        <h2>Resumo Geral</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
          <div style={statCardStyle}>
            <h3 style={{ fontSize: '2rem', color: '#85a5ff', margin: 0 }}>4</h3>
            <p>Trilhas em Andamento</p>
          </div>
          <div style={statCardStyle}>
            <h3 style={{ fontSize: '2rem', color: '#85a5ff', margin: 0 }}>3</h3>
            <p>Certificados Obtidos</p>
          </div>
          <div style={statCardStyle}>
            <h3 style={{ fontSize: '2rem', color: '#85a5ff', margin: 0 }}>85%</h3>
            <p>Taxa de Conclusão</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Histórico Recente</h2>
        <ul className="cursos-list">
          <li>Módulo "Hooks no React" concluído em 06/05/2026</li>
          <li>Iniciou a trilha "Microsoft Azure Fundamentals" em 02/05/2026</li>
          <li>Certificado "Metodologias Ágeis" adicionado ao perfil em 22/04/2026</li>
        </ul>
      </div>
    </div>
  );
}

const statCardStyle = {
  flex: 1,
  backgroundColor: '#2b2d31',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center'
};

export default Dashboard;