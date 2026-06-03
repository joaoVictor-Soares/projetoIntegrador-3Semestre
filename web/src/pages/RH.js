import React, { useState, useEffect } from 'react';
import '../styles/RH.css';

// Recebemos a prop 'certificados' do App.js
function RH({ progressoFuncionario, certificados, setCertificados }) {
  const [expandidoId, setExpandidoId] = useState(null);
  const [equipe, setEquipe] = useState([]);
  const [cursosEmAndamento, setCursosEmAndamento] = useState([]);
  const [cursosFinalizados, setCursosFinalizados] = useState([]);

  useEffect(() => {
    buscarEquipe();
  }, []);

  // Toda vez que abrir ou mudar de funcionário, busca os cursos dele
  useEffect(() => {
    cursos_em_andamento();
    buscarCertificados();
  }, [expandidoId]);

  async function buscarEquipe() {
    try {
      const response = await fetch("http://localhost:5000/equipe");
      if (response.ok) {
        const data = await response.json();
        const dadosTratados = Array.isArray(data[0]) ? data[0] : data;
        setEquipe(dadosTratados);
      } else {
        console.error("Erro na resposta do servidor");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar equipe");
    }
  }

  async function cursos_em_andamento() {
    // CORREÇÃO 1: Se expandidoId for null (fechou o card) ou undefined, para a execução aqui!
    if (!expandidoId) {
      setCursosEmAndamento([]);
      setCursosFinalizados([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/buscar_cursos_realizados/${expandidoId}`);
      
      if (response.ok) {
        const data = await response.json();
        
        // CORREÇÃO 2: Caso o backend traga array duplo igual ao login, limpa os colchetes extras
        const dadosTratados = Array.isArray(data[0]) ? data[0] : data;

        // Filtra os iniciados
        const iniciados = dadosTratados.filter(curso => curso.status === "INICIADO");
        setCursosEmAndamento(iniciados);

        // Filtra os finalizados
        const finalizados = dadosTratados.filter(curso => curso.status === "FINALIZADO");
        setCursosFinalizados(finalizados);

      } else {
        console.error("Erro ao buscar os cursos do servidor");
        setCursosEmAndamento([]);
        setCursosFinalizados([]);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao se conectar com o servidor");
    }
  }

  const buscarCertificados = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/certificados?usuario_id=${expandidoId}`);
      const dados = await response.json();

      if (response.ok) {
        // Atualiza tanto o estado global recebido via prop quanto limpa mensagens
        setCertificados(dados);
      } else {
        alert(dados.erro || 'Erro ao buscar certificados.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão com o servidor.');
    }
  };

  const abrirCertificado = (link) => {
    window.open(link, '_blank');
  };

  const toggleExpandir = (id) => {
    setExpandidoId(expandidoId === id ? null : id);
  };

  return (
    <div className="rh-container">
      <h1 className="rh-title">Painel de Gestão de Funcionários</h1>

      <div className="monitoramento-full-section">
        <h3>Monitoramento de Equipe</h3>
        <p className="monitoramento-desc">Clique numa linha para expandir a ficha detalhada do colaborador.</p>
        
        <div className="lista-equipe-vertical">
          {equipe.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#aaa', padding: '20px' }}>Carregando equipe...</p>
          ) : (
            equipe.map((func) => {
              const idDoFuncionario = func.numero_registro;
              const nomeFuncionario = func.name || func.nome || "Funcionário Sem Nome";

              return (
                <div key={idDoFuncionario} className="accordion-item" style={{ marginBottom: '10px' }}>
                  <div className="accordion-header" onClick={() => toggleExpandir(idDoFuncionario)} style={{ cursor: 'pointer' }}>
                    <div className="func-resumo">
                      <div className="func-avatar">{nomeFuncionario.charAt(0)}</div>
                      <div className="func-info-basica">
                        <strong>{nomeFuncionario}</strong>
                        <span>{func.cargo || "Cargo não informado"}</span>
                      </div>
                    </div>
                    <span className="seta-expansao">
                      {expandidoId === idDoFuncionario ? '▲' : '▼'}
                    </span>
                  </div>

                  {/* CONTEÚDO EXPANDIDO */}
                  {expandidoId === idDoFuncionario && (
                    <div className="accordion-content" style={{ padding: '15px', backgroundColor: '#2a2a2a', borderRadius: '4px', marginTop: '5px' }}>
                      <p><strong>Departamento:</strong> {func.departamento || "Não informado"}</p>
                      <p><strong>Registro/ID:</strong> {idDoFuncionario}</p>
                      
                      <hr style={{ borderColor: '#444', margin: '15px 0' }} />

                      <h2>CURSOS INICIADOS</h2>
                      {cursosEmAndamento.length === 0 ? (
                        <p style={{ color: '#888', fontStyle: 'italic' }}>Nenhum curso iniciado.</p>
                      ) : (
                        cursosEmAndamento.map((cea) => (
                          <div key={cea.id} className="curso-card-individual" style={{ padding: '10px', background: '#1a1a1a', borderRadius: '4px', marginBottom: '8px' }}>
                            <h3 style={{ margin: '0 0 5px 0', color: '#ffd591' }}>{cea.titulo}</h3>
                            <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>Duração: {cea.duracao} minutos</p>
                            <a href={cea.link} target="_blank" rel="noreferrer" style={{ color: '#1890ff' }}>Acessar Curso</a>
                          </div>
                        ))
                      )}

                      <h2 style={{ marginTop: '20px' }}>CURSOS FINALIZADOS</h2>
                      {cursosFinalizados.length === 0 ? (
                        <p style={{ color: '#888', fontStyle: 'italic' }}>Nenhum curso finalizado ainda.</p>
                      ) : (
                        cursosFinalizados.map((cea) => (
                          <div key={cea.id} className="curso-card-individual" style={{ padding: '10px', background: '#1a1a1a', borderRadius: '4px', marginBottom: '8px' }}>
                            <h3 style={{ margin: '0 0 5px 0', color: '#b7eb8f' }}>{cea.titulo}</h3>
                            <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>Duração: {cea.duracao} minutos</p>
                            <a href={cea.link} target="_blank" rel="noreferrer" style={{ color: '#1890ff' }}>Acessar Curso</a>
                          </div>
                        ))
                      )}

                      <h2 style={{ marginTop: '20px' }}>CERTIFICADOS</h2>
                      <div>
                        {certificados && certificados.length === 0 ? (
                          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#aaa' }}>
                            Nenhum certificado carregado para este usuário.
                          </p>
                        ) : (
                          certificados.map(cert => (
                            <div key={cert.id} className="card">
                              {/* Adapte as chaves abaixo (nome, nome_original, url_download) 
                                  de acordo com o JSON que o seu Flask retorna no GET */}
                              <h3 style={{ color: '#85a5ff', marginBottom: '10px' }}>{cert.nome_original || cert.nome}</h3>
                              
                              <div className="user-info">
                                <p style={{ marginBottom: '15px' }}>
                                  <strong>Data de Upload:</strong> {cert.data || new Date().toLocaleDateString('pt-BR')}
                                </p>
                              </div>

                              <button className="btn-outline" onClick={() => abrirCertificado(cert.url_download || cert.link)}>
                                Visualizar
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )} 
        </div>
      </div>
    </div>
  );
}

export default RH;