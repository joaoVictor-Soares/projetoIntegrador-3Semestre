import React, { useState } from 'react';
import '../styles/Funcionario.css';

function Funcionario({ progresso, setProgresso }) {
  // Estado local para a barra deslizar suavemente antes de guardar no sistema
  const [progressoBarra, setProgressoBarra] = useState(progresso);

  const handleSalvarProgresso = () => {
    setProgresso(progressoBarra); // Envia o valor final para o App.js (e para o RH)
    alert(`Progresso guardado em ${progressoBarra}%! O painel de Gestão (RH) já foi atualizado.`);
  };

  return (
    <div className="funcionario-container">
      <h1 className="funcionario-title">Área do Funcionário</h1>

      {/* 1. ÁREA DO PERFIL */}
      <div className="card-section perfil-card">
        <div className="perfil-avatar">BD</div>
        <div className="perfil-dados">
          <h2>Breno Dolcinotti</h2>
          <p><strong>Cargo:</strong> Desenvolvedor de Sistemas</p>
          <p><strong>Departamento:</strong> Tecnologia da Informação (TI)</p>
        </div>
      </div>

      {/* 2. SUAS TRILHAS DE APRENDIZADO (Com a barra de arrastar) */}
      <div className="card-section trilhas-section">
        <h2>Suas Trilhas de Aprendizado Ativas</h2>
        
        <div className="trilha-ativa-container">
          <h3>Desenvolvimento Full Stack com React</h3>
          <p className="trilha-desc">Módulo atual: Integração de APIs e Gestão de Estado</p>
          
          <div className="slider-container">
            <label>O seu avanço no curso: <strong>{progressoBarra}%</strong></label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progressoBarra} 
              onChange={(e) => setProgressoBarra(e.target.value)}
              className="range-slider"
            />
          </div>

          <button className="btn-salvar-progresso" onClick={handleSalvarProgresso}>
            Salvar Progresso
          </button>
        </div>
      </div>

      {/* 3. NOVOS CURSOS DISPONÍVEIS */}
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
  );
}

export default Funcionario;