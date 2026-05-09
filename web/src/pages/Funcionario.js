import React, { useState } from 'react';
import '../styles/Funcionario.css';

function Funcionario({ progresso, setProgresso }) {
  const [progressoBarra, setProgressoBarra] = useState(progresso);
  
  // NOVO: Estado para controlar se a senha aparece ou fica escondida nas bolinhas
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleSalvarProgresso = () => {
    setProgresso(progressoBarra);
    alert(`Progresso guardado em ${progressoBarra}%! O painel de Gestão (RH) já foi atualizado.`);
  };

  return (
    <div className="funcionario-container">
      <h1 className="funcionario-title">Área do Colaborador</h1>

      {/* 1. ÁREA DO PERFIL */}
      <div className="card-section perfil-card">
        <div className="perfil-avatar">BD</div>
        <div className="perfil-dados">
          <h2>Breno Dolcinotti</h2>
          
          {/* NOVO: Número de Registo abaixo do nome */}
          <p><strong>Registro:</strong> 123456</p>
          
          <p><strong>Cargo:</strong> Desenvolvedor de Sistemas</p>
          <p><strong>Departamento:</strong> Tecnologia da Informação (TI)</p>
          
          {/* NOVO: Senha escondida com botão interativo abaixo do departamento */}
          <div className="senha-linha">
            <p><strong>Senha:</strong> {mostrarSenha ? "adm123456" : "••••••••"}</p>
            <button 
              className="btn-mostrar-senha" 
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? "Ocultar" : "Mostrar"}
            </button>
          </div>

        </div>
      </div>

      {/* 2. SUAS TRILHAS DE APRENDIZADO */}
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
      
    </div>
  );
}

export default Funcionario;