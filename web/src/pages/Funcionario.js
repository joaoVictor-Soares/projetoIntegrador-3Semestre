// Funcionario.jsx

import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import '../styles/Funcionario.css';

function Funcionario({ setProgresso }) {

  const location = useLocation();
  const user = location.state?.user;
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [cursosEmAndamento, setCursosEmAndamento] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); 
  const [nomeNovoCurso, setNomeNovoCurso] = useState("");

  const handleAdicionarCurso = () => {
    if (nomeNovoCurso.trim() !== "") {
      const novoCurso = {
        id: Date.now(),
        nome: nomeNovoCurso,
        progresso: 0 
      };

      setCursosEmAndamento([...cursosEmAndamento, novoCurso]);
      setNomeNovoCurso("");
    }
  };

  const handleProgressoChange = (id, novoValor) => {
    const cursosAtualizados = cursosEmAndamento.map(curso => 
      curso.id === id ? { ...curso, progresso: novoValor } : curso
    );

    setCursosEmAndamento(cursosAtualizados);
  };

  const handleSalvarProgresso = (curso) => {
    if (setProgresso) setProgresso(curso.progresso); 
    alert(`Progresso do curso "${curso.nome}" salvo em ${curso.progresso}%!`);
  };

  return (
    <div className="funcionario-container">

      <h1 className="perfil-header-title">
        Funcionário: {user?.nome}
      </h1>

      <p className="perfil-registro">
        Número de Registro: {user?.registro}
      </p>
      
      <div className="perfil-dados-extra">

        <p>
          <strong>Cargo:</strong> {user?.cargo}
        </p>

        <p>
          <strong>Departamento:</strong> {user?.departamento}
        </p>

        <div className="senha-linha">

          <p>
            <strong>Senha:</strong> {mostrarSenha ? user?.senha : "••••••••"}
          </p>

          <button 
            className="btn-mostrar-senha" 
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? "Ocultar" : "Mostrar"}
          </button>

        </div>
      </div>

      <div className="cursos-andamento-section">

        <h2 className="cursos-titulo">
          Cursos em andamento
        </h2>

        <div className="form-adicionar-curso">

          <button 
            className="btn-abrir-adicionar"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            + Adicionar Curso
          </button>

          {mostrarFormulario && (
            <>
              <input 
                type="text" 
                placeholder="Nome do curso" 
                value={nomeNovoCurso}
                onChange={(e) => setNomeNovoCurso(e.target.value)}
                className="input-nome-curso"
              />

              <button 
                className="btn-ok-adicionar" 
                onClick={handleAdicionarCurso}
              >
                OK
              </button>
            </>
          )}
        </div>

        <div className="lista-cursos-cards">

          {cursosEmAndamento.map((curso) => (
            <div key={curso.id} className="curso-card-individual">

              <h3>{curso.nome}</h3>

              <span className="curso-porcentagem">
                {curso.progresso}%
              </span>
              
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={curso.progresso} 
                onChange={(e) => handleProgressoChange(curso.id, e.target.value)}
                className="range-slider-curso"
              />
              
              <button 
                className="btn-ok-progresso" 
                onClick={() => handleSalvarProgresso(curso)}
              >
                OK
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Funcionario;