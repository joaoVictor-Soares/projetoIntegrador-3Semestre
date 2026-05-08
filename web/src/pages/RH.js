import React from 'react';
import '../styles/RH.css';

// Recebemos o 'progressoFuncionario' como prop vinda do App.js
function RH({ progressoFuncionario }) {
  
  // Lista de funcionários estáticos (exemplo)
  const equipe = [
    { id: 1, nome: "João Silva", cargo: "Desenvolvedor", progresso: 70 },
    { id: 2, nome: "Maria Souza", cargo: "Analista", progresso: 40 },
    { id: 3, nome: "Carlos Lima", cargo: "Suporte", progresso: 90 },
  ];

  // Calculamos a média simples incluindo o teu progresso atual
  const totalFuncionarios = equipe.length + 1;
  const somaProgresso = equipe.reduce((acc, func) => acc + func.progresso, 0) + Number(progressoFuncionario);
  const mediaProgresso = Math.round(somaProgresso / totalFuncionarios);

  return (
    <div className="rh-container">
      <h1 className="rh-title">Painel de Gestão (RH)</h1>
      
      {/* Cartões de Estatísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total de Funcionários</h3>
          <p className="stat-number">{totalFuncionarios}</p>
        </div>
        <div className="stat-card">
          <h3>Média de Progresso</h3>
          <p className="stat-number">{mediaProgresso}%</p>
        </div>
      </div>

      <div className="rh-content-grid">
        
        {/* Coluna da Esquerda: Monitoramento */}
        <div className="monitoramento-section">
          <h3>Monitoramento de Equipe</h3>
          
          <div className="lista-equipe">
            
            {/* O TEU PERFIL (Conectado ao Slider do Perfil) */}
            <div className="funcionario-item">
              <div className="func-info">
                <strong>Breno Dolcinotti</strong>
                <span>Desenvolvedor Full Stack</span>
              </div>
              <div className="barra-progresso-container">
                <span className="porcentagem-texto">{progressoFuncionario}%</span>
                <div className="barra-fundo">
                  <div 
                    className="barra-preenchimento" 
                    style={{ width: `${progressoFuncionario}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Restante da Equipe */}
            {equipe.map(func => (
              <div key={func.id} className="funcionario-item">
                <div className="func-info">
                  <strong>{func.nome}</strong>
                  <span>{func.cargo}</span>
                </div>
                <div className="barra-progresso-container">
                  <span className="porcentagem-texto">{func.progresso}%</span>
                  <div className="barra-fundo">
                    <div 
                      className="barra-preenchimento" 
                      style={{ width: `${func.progresso}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna da Direita: Ações e Info */}
        <div className="acoes-rh">
          
          <div className="card-rh">
            <h3>Novo Colaborador</h3>
            <div className="form-rh">
              <input type="text" placeholder="Nome do funcionário" className="input-rh" />
              <button className="btn-rh">Adicionar</button>
            </div>
          </div>

          <div className="card-rh">
            <h3>Trilhas Ativas</h3>
            <ul className="lista-trilhas">
              <li>Microsoft Azure Fundamentals</li>
              <li>React Native Advanced</li>
              <li>Lógica de Programação</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}

export default RH;