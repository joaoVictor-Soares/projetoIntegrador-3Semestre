import React, { useState } from "react";
import '../styles/Funcionario.css';

function Funcionario() {
  const [funcionario] = useState({
    nome: "João Silva",
    cargo: "Desenvolvedor Júnior",
    departamento: "Tecnologia"
  });

  const [trilhas, setTrilhas] = useState([
    {
      nome: "Trilha React",
      modulos: [
        { nome: "Introdução ao React", concluido: false },
        { nome: "Componentes", concluido: false },
        { nome: "Hooks", concluido: false }
      ]
    },
    {
      nome: "Trilha Python",
      modulos: [
        { nome: "Python Básico", concluido: false },
        { nome: "Flask", concluido: false },
        { nome: "Banco de Dados", concluido: false }
      ]
    }
  ]);

  const toggleModulo = (trilhaIndex, moduloIndex) => {
    const novasTrilhas = [...trilhas];
    novasTrilhas[trilhaIndex].modulos[moduloIndex].concluido = !novasTrilhas[trilhaIndex].modulos[moduloIndex].concluido;
    setTrilhas(novasTrilhas);
  };

  const calcularProgresso = (modulos) => {
    const concluidos = modulos.filter(m => m.concluido).length;
    return Math.round((concluidos / modulos.length) * 100);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Área do Funcionário</h1>

      <div className="card">
        <h2>Dados Pessoais</h2>
        <div className="user-info">
          <p><strong>Nome:</strong> {funcionario.nome}</p>
          <p><strong>Cargo:</strong> {funcionario.cargo}</p>
          <p><strong>Departamento:</strong> {funcionario.departamento}</p>
        </div>
      </div>

      <h2 className="section-title">Suas Trilhas de Aprendizado</h2>

      <div className="trilhas-grid">
        {trilhas.map((trilha, trilhaIndex) => {
          const progresso = calcularProgresso(trilha.modulos);
          
          return (
            <div key={trilhaIndex} className="card trilha-card">
              <h3>{trilha.nome}</h3>
              
              <div className="progress-container">
                <p>Progresso: {progresso}%</p>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${progresso}%` }}></div>
                </div>
              </div>

              <div className="modulos-list">
                {trilha.modulos.map((modulo, moduloIndex) => (
                  <label key={moduloIndex} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={modulo.concluido}
                      onChange={() => toggleModulo(trilhaIndex, moduloIndex)}
                    />
                    <span className={modulo.concluido ? "concluido" : ""}>
                      {modulo.nome}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h2>Novos Cursos Disponíveis</h2>
        <ul className="cursos-list">
          <li>Docker Básico</li>
          <li>Git Avançado</li>
          <li>TypeScript</li>
          <li>Cloud Computing</li>
        </ul>
      </div>
    </div>
  );
}

export default Funcionario;