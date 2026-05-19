import React, { useState } from 'react';
import '../styles/Funcionario.css';

function Funcionario({ setProgresso }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [cursosEmAndamento, setCursosEmAndamento] = useState([]);
  
  // AQUI FOI A MUDANÇA: Começa como 'false' para esconder o campo e o botão OK no início
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
      // Opcional: Se quiser que o campo feche de novo após adicionar o curso, descomente a linha abaixo:
      // setMostrarFormulario(false); 
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
      {/* 1. ÁREA DO PERFIL */}
      <h1 className="perfil-header-title">Funcionário: Breno Dolcinotti</h1>
      <p className="perfil-registro">Número de Registro: 123456</p>
      
      <div className="perfil-dados-extra">
        <p><strong>Cargo:</strong> Desenvolvedor de Sistemas</p>
        <p><strong>Departamento:</strong> Tecnologia da Informação (TI)</p>
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

      {/* 2. CURSOS EM ANDAMENTO */}
      <div className="cursos-andamento-section">
        <h2 className="cursos-titulo">Cursos em andamento</h2>

        <div className="form-adicionar-curso">
          <button 
            className="btn-abrir-adicionar" 
            type="button"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            <span className="button__text">Adicionar</span>
            <span className="button__icon">
              <svg 
                className="svg" 
                fill="none" 
                height="24" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                width="24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" x2="12" y1="5" y2="19"></line>
                <line x1="5" x2="19" y1="12" y2="12"></line>
              </svg>
            </span>
          </button>

          {/* O campo de input e o botão OK só aparecem se 'mostrarFormulario' for true */}
          {mostrarFormulario && (
            <>
              <input 
                type="text" 
                placeholder="Nome do curso" 
                value={nomeNovoCurso}
                onChange={(e) => setNomeNovoCurso(e.target.value)}
                className="input-nome-curso"
              />
              <button className="btn-ok-adicionar" onClick={handleAdicionarCurso}>
                OK
              </button>
            </>
          )}
        </div>

        <div className="lista-cursos-cards">
          {cursosEmAndamento.map((curso) => (
            <div key={curso.id} className="curso-card-individual">
              <h3>{curso.nome}</h3>
              <span className="curso-porcentagem">{curso.progresso}%</span>
              
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