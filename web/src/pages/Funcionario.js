// Funcionario.jsx

import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import '../styles/Funcionario.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Funcionario({ setProgresso }) {

  const { usuario } = useAuth();
  const funcionario = usuario;
  const navigate  = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [cursosEmAndamento, setCursosEmAndamento] = useState([]);
  const [cursosFinalizados, setCursosFinalizados] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); 
  const [nomeNovoCurso, setNomeNovoCurso] = useState("");
  
async function cursos_em_andamento() {
  // Verificação de segurança caso o funcionário ainda não tenha carregado na tela
  if (!funcionario?.numero_registro) return;

  try {
    const response = await fetch(`http://localhost:5000/buscar_cursos_realizados/${funcionario.numero_registro}`);
    
    if (response.ok) {
      const data = await response.json();
      
      // Se o seu Flask trouxer a lista dentro de uma matriz/array duplo igual ao login, 
      // descomente a linha abaixo para limpar os colchetes extras:
      // const dadosTratados = Array.isArray(data[0]) ? data[0] : data;
      const dadosTratados = data; // Caso já venha como um array direto de objetos

      // 1. Filtra e adiciona apenas os cursos com status "INICIADO"
      const iniciados = dadosTratados.filter(curso => curso.status === "INICIADO");
      setCursosEmAndamento(iniciados);

      // 2. Filtra e adiciona apenas os cursos com status "FINALIZADO"
      const finalizados = dadosTratados.filter(curso => curso.status === "FINALIZADO");
      setCursosFinalizados(finalizados); // Certifique-se de ter esse useState declarado no topo do arquivo

      console.log("Em andamento:", iniciados);
      console.log("Finalizados:", finalizados);

    } else {
      console.error("Erro ao buscar os cursos do servidor");
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao se conectar com o servidor");
  }
}

  useEffect(() => {
    cursos_em_andamento()
  }, [])

  async function handleSalvarProgresso(id) {
    try {
    // Passando o registro e o id do curso direto na URL
    const response = await fetch(`http://localhost:5000/update_cursos_incritos/${funcionario?.numero_registro}/${id}`, {
      method: "POST" // Mantendo o método POST que você definiu no decorator
    });

    const dados = await response.json();

    if (response.ok) {
      alert(dados.mensagem); // "Curso finalizado com sucesso!"
      navigate("/certificados");
    } else {
      alert(`Erro: ${dados.erro}`);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
  }

  return (
    <div className="funcionario-container">

      <h1 className="perfil-header-title">
        Funcionário: {funcionario?.name}
      </h1>

      <p className="perfil-registro">
        Número de Registro: {funcionario?.numero_registro}
      </p>
      
      <div className="perfil-dados-extra">

        <p>
          <strong>Cargo:</strong> {funcionario?.cargo}
        </p>

        <p>
          <strong>Departamento:</strong> {funcionario?.departamento}
        </p>

        <div className="senha-linha">

          <p>
            <strong>Senha:</strong> {mostrarSenha ? funcionario?.password : "••••••••"}
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

        {cursosEmAndamento == 0 ? (
          <div>
            <h3>NENHUM CURSO EM ANDAMENTO</h3>
          </div>
        )
      :
      (
        <div className="lista-cursos-cards">

          {cursosEmAndamento.map((curso) => (
            <div key={curso.id} className="curso-card-individual">

              <h3>{curso.titulo}</h3>
              <h1>Duração: {curso.duracao} minutos</h1>
              
              <button 
                className="btn-ok-progresso" 
                onClick={() => handleSalvarProgresso(curso.id)}
              >
                FINALIZAR CURSO
              </button>

              <a href={curso.link}>Acessar Curso</a>

            </div>
          ))}
        </div>
      )}

      </div>

       <div className="cursos-andamento-section">

        <h2 className="cursos-titulo">
          Cursos Finalizados
        </h2>

        <div className="lista-cursos-cards">

          {cursosFinalizados.map((curso) => (
            <div key={curso.id} className="curso-card-individual">

              <h3>{curso.titulo}</h3>
              <h1>Duração: {curso.duracao} minutos</h1>
            
              <a href={curso.link}>Acessar Curso</a>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Funcionario;