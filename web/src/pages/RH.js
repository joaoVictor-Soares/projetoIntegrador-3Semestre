import React, { useState } from 'react';
import '../styles/RH.css';

// NOVO: Recebemos a prop 'certificados' do App.js
function RH({ progressoFuncionario, certificados = [] }) {
  const [expandidoId, setExpandidoId] = useState(null);

  const equipe = [
    { 
      id: 1, 
      nome: "Breno Dolcinotti", 
      cargo: "Desenvolvedor Full Stack", 
      departamento: "Tecnologia da Informação (TI)",
      email: "breno.dolcinotti@sla.com",
      cursos: [
        { nome: "Desenvolvimento Full Stack com React", progresso: progressoFuncionario },
        { nome: "Arquitetura de Software em Java", progresso: 25 },
        { nome: "Redes Industriais e Profibus", progresso: 100 }
      ]
    },
    { 
      id: 2, 
      nome: "João Victor", 
      cargo: "Desenvolvedor Front-end", 
      departamento: "Tecnologia da Informação (TI)",
      email: "joao.silva@sla.com",
      cursos: [
        { nome: "UI/UX Design Avançado", progresso: 70 },
        { nome: "Acessibilidade Web", progresso: 40 }
      ]
    },
    { 
      id: 3, 
      nome: "Anna Karolina", 
      cargo: "Lixeira", 
      departamento: "Limpeza",
      email: "annakarol@sla.com",
      cursos: [
        { nome: "Como Limpar com eficiencia", progresso: 20 },
        { nome: "Como para de ser chata", progresso: 0 }
      ]
    },
    { 
      id: 4, 
      nome: "Alice Prado", 
      cargo: "Escritora", 
      departamento: "Design",
      email: "alice.prado@sla.com",
      cursos: [
        { nome: "Como escrever em linha reta", progresso: 0 },
        { nome: "Escreva um livro em 2 dias", progresso: 10 }
      ]
    }
  ];

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
          {equipe.map(func => {
            
            // NOVO: Filtra os certificados que têm o mesmo nome deste funcionário
            const certificadosDoFuncionario = certificados.filter(
              cert => cert.nome.toLowerCase() === func.nome.toLowerCase() || 
                      (func.nome.includes("Você") && cert.nome.toLowerCase() === "breno dolcinotti")
            );

            return (
              <div 
                key={func.id} 
                className={`funcionario-accordion-item ${expandidoId === func.id ? 'active' : ''}`}
              >
                
                <div className="accordion-header" onClick={() => toggleExpandir(func.id)}>
                  <div className="func-resumo">
                    <div className="func-avatar">{func.nome.charAt(0)}</div>
                    <div className="func-info-basica">
                      <strong>{func.nome}</strong>
                      <span>{func.cargo}</span>
                    </div>
                  </div>
                  <span className="seta-expansao">
                    {expandidoId === func.id ? '▲' : '▼'}
                  </span>
                </div>

                {expandidoId === func.id && (
                  <div className="accordion-body">
                    
                    <div className="detalhes-grid">
                      <div className="detalhes-info">
                        <h4>Dados Cadastrais</h4>
                        <p><strong>Nome:</strong> {func.nome}</p>
                        <p><strong>Cargo:</strong> {func.cargo}</p>
                        <p><strong>Departamento:</strong> {func.departamento}</p>
                        <p><strong>E-mail:</strong> {func.email}</p>
                      </div>

                      <div className="detalhes-cursos">
                        <h4>Trilhas de Aprendizado Ativas</h4>
                        <ul className="cursos-lista">
                          {func.cursos.map((curso, index) => (
                            <li key={index} className="curso-item-detalhado">
                              <div className="curso-cabecalho">
                                <span className="curso-nome">🎓 {curso.nome}</span>
                                <span className="curso-porcentagem">{curso.progresso}%</span>
                              </div>
                              <div className="barra-fundo-grande">
                                <div 
                                  className="barra-preenchimento-grande" 
                                  style={{ width: `${curso.progresso}%` }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* NOVA SECÇÃO: Certificados do Funcionário (Ocupa a largura toda por baixo) */}
                    <div className="detalhes-certificados">
                      <h4>Certificados Concluídos</h4>
                      
                      {certificadosDoFuncionario.length === 0 ? (
                        <p className="sem-certificados">Nenhum certificado enviado ainda.</p>
                      ) : (
                        <div className="certificados-grid-rh">
                          {certificadosDoFuncionario.map((cert, index) => (
                            <div key={index} className="certificado-card-rh">
                              <div className="cert-icone">📄</div>
                              <div className="cert-info">
                                <strong>{cert.curso}</strong>
                                <span>Enviado por: {cert.nome}</span>
                              </div>
                              <a 
                                href={cert.arquivo} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn-ver-arquivo"
                              >
                                Ver Arquivo
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                  </div>
                )}
                
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default RH;