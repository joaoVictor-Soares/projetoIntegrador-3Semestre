import React, { useState } from "react";
import '../styles/RH.css';

function RH() {
  const [funcionarios, setFuncionarios] = useState([
    { nome: "João Silva", cargo: "Desenvolvedor", progresso: 70 },
    { nome: "Maria Souza", cargo: "Analista", progresso: 40 },
    { nome: "Carlos Lima", cargo: "Suporte", progresso: 90 }
  ]);

  const [novaTrilha, setNovaTrilha] = useState("");
  const [trilhas, setTrilhas] = useState([
    "React",
    "Python",
    "Segurança da Informação"
  ]);

  const [novoFuncionario, setNovoFuncionario] = useState("");

  const adicionarTrilha = () => {
    if (novaTrilha !== "") {
      setTrilhas([...trilhas, novaTrilha]);
      setNovaTrilha("");
    }
  };

  const adicionarFuncionario = () => {
    if (novoFuncionario !== "") {
      setFuncionarios([
        ...funcionarios,
        { nome: novoFuncionario, cargo: "Novo", progresso: 0 }
      ]);
      setNovoFuncionario("");
    }
  };

  const mediaProgresso = funcionarios.length > 0 
    ? Math.round(funcionarios.reduce((acc, f) => acc + f.progresso, 0) / funcionarios.length) 
    : 0;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Painel de Gestão (RH)</h1>

      {/* Resumo do Dashboard */}
      <div className="card stats-row">
        <div className="stat-item">
          <h2>Total de Funcionários</h2>
          <p className="stat-value">{funcionarios.length}</p>
        </div>
        <div className="stat-item">
          <h2>Média de Progresso</h2>
          <p className="stat-value">{mediaProgresso}%</p>
        </div>
      </div>

      <div className="rh-grid">
        {/* Lista de Funcionários */}
        <div className="card">
          <h2>Monitoramento de Equipe</h2>
          <div className="funcionarios-lista">
            {funcionarios.map((f, index) => (
              <div key={index} className="funcionario-item">
                <div className="info">
                  <strong>{f.nome}</strong>
                  <span>{f.cargo}</span>
                </div>
                <div className="progress-section">
                  <span className="perc">{f.progresso}%</span>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${f.progresso}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gerenciamento */}
        <div className="management-column">
          {/* Adicionar Funcionário */}
          <div className="card">
            <h2>Novo Colaborador</h2>
            <div className="form-group">
              <input
                placeholder="Nome do funcionário"
                value={novoFuncionario}
                onChange={(e) => setNovoFuncionario(e.target.value)}
              />
              <button onClick={adicionarFuncionario} className="rh-button">
                Adicionar
              </button>
            </div>
          </div>

          {/* Trilhas */}
          <div className="card">
            <h2>Trilhas Ativas</h2>
            <ul className="trilhas-list-rh">
              {trilhas.map((t, index) => (
                <li key={index}>{t}</li>
              ))}
            </ul>
            <div className="form-group">
              <input
                placeholder="Nova trilha"
                value={novaTrilha}
                onChange={(e) => setNovaTrilha(e.target.value)}
              />
              <button onClick={adicionarTrilha} className="rh-button">
                Criar Trilha
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RH;