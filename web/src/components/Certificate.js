import React, { useState, useRef, useEffect } from 'react';
import '../styles/Certificate.css'; 
import { useAuth } from '../context/AuthContext';

// Recebe os certificados e a função de atualizar via props
function Certificate({ certificados, setCertificados }) {
  const { usuario } = useAuth();
  console.log("Usuário completo do Contexto:", usuario)
  
  // Como o Contexto já entrega o objeto limpo do usuário, pegamos direto sem o [0]
  const usuarioId = usuario?.numero_registro;
  console.log(usuarioId)
  const [nomeCurso, setNomeCurso] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mensagem, setMensagem] = useState(""); // Declarado o estado de mensagem que faltava
  
  const fileInputRef = useRef(null);

  // Busca automática ao carregar a página se o ID existir
  useEffect(() => {
    if (usuarioId) {
      buscarCertificados();
    }
  }, [usuarioId]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setArquivo(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setArquivo(e.target.files[0]);
    }
  };

  const buscarCertificados = async () => {
    if (!usuarioId) {
      setMensagem("Por favor, faça login para verificar o número de registro.");
      return;
    }

    try {
      const response = await fetch(`http://10.110.12.90:5000/api/certificados?usuario_id=${usuarioId}`);
      const dados = await response.json();

      if (response.ok) {
        // Atualiza tanto o estado global recebido via prop quanto limpa mensagens
        setCertificados(dados);
        setMensagem('');
      } else {
        setMensagem(dados.erro || 'Erro ao buscar certificados.');
      }
    } catch (error) {
      console.error(error);
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    
    if (nomeCurso.trim() === "" || !arquivo) {
      alert("Preencha o nome do curso e anexe um arquivo.");
      return;
    }

    if (!usuarioId) {
      alert("Erro: ID de usuário não identificado. Faça login novamente.");
      return;
    }

    const formData = new FormData();
    formData.append('arquivo', arquivo);
    // Verifique se o seu backend Flask espera 'usuario_id' ou 'usuarioId' no request.form
    formData.append('usuario_id', usuarioId); 

    try {
      // 1. CORRIGIDO: Alterado de hrrp:// para http://
      const response = await fetch('http://10.110.12.90:5000/api/certificados/upload', {
        method: 'POST',
        body: formData
      });

      // 2. CORRIGIDO: Adicionado o await necessário para ler o json
      const dados = await response.json();

      if (response.ok) {
        alert(dados.mensagem || "Upload realizado com sucesso");
        
        // 5. CORRIGIDO: Ajustado o ID para 'input_arquivo' batendo com o HTML
        setArquivo(null);
        if (document.getElementById('input_arquivo')) {
          document.getElementById('input_arquivo').value = '';
        }
        setNomeCurso("");
        
        // Recarrega a lista do backend atualizada
        buscarCertificados();
        
      } else {
        alert(`Erro do servidor: ${dados.erro}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar arquivo para o servidor.");
    }
  };

  const abrirCertificado = (link) => {
  if (!link) {
    alert("Erro: Link do certificado não encontrado.");
    return;
  }

  try {
    // No React Web, usamos o window.open para abrir o link em uma nova aba.
    // O '_blank' garante que a aba atual do seu sistema não seja fechada.
    window.open(link, '_blank');
  } catch (error) {
    console.error(error);
    alert("Erro: Formato de link inválido ou inacessível.");
  }
};

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Meus Certificados</h1>
      
      {mensagem && <p style={{ color: 'red', textAlign: 'center' }}>{mensagem}</p>}
      
      <div className="card upload-card">
        <h2>Adicionar Novo Certificado</h2>
        <div className="form-group">
          <label>Nome do Curso:</label>
          <input 
            type="text" 
            placeholder="Ex: Microsoft Azure Fundamentals"
            value={nomeCurso}
            onChange={(e) => setNomeCurso(e.target.value)}
            className="cert-input"
          />
        </div>

        <div 
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input 
            id='input_arquivo'
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileInput} 
            style={{ display: 'none' }} 
            accept=".pdf,.jpg,.jpeg,.png"
          />
          {arquivo ? (
            <div className="file-selected">
              <p><strong>Selecionado:</strong> {arquivo.name}</p>
            </div>
          ) : (
            <div className="file-prompt">
              <p>Arraste ou clique para anexar seu arquivo</p>
            </div>
          )}
        </div>

        <button onClick={handleSalvar} className="btn-ok">OK</button>
      </div>

      <h2 className="section-title">Certificados Salvos</h2>
      
      <div className="trilhas-grid">
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
  );
}

export default Certificate;