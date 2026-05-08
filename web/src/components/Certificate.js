import React, { useState, useRef } from 'react';
import '../styles/Certificate.css'; 

// Recebe os certificados e a função de atualizar via props
function Certificate({ certificados, setCertificados }) {
  const [nomeCurso, setNomeCurso] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef(null);

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

  const handleSalvar = () => {
    if (nomeCurso.trim() === "" || !arquivo) {
      alert("Preencha o nome e anexe um arquivo.");
      return;
    }

    const arquivoUrl = URL.createObjectURL(arquivo);

    const novoCertificado = {
      id: Date.now(),
      nome: nomeCurso,
      nomeArquivo: arquivo.name,
      data: new Date().toLocaleDateString('pt-BR'),
      link: arquivoUrl
    };

    setCertificados([...certificados, novoCertificado]);
    
    // Limpa apenas os campos de entrada locais
    setNomeCurso("");
    setArquivo(null);
  };

  const abrirCertificado = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Meus Certificados</h1>
      
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
        {certificados.map(cert => (
          <div key={cert.id} className="card">
            <h3 style={{ color: '#85a5ff', marginBottom: '10px' }}>{cert.nome}</h3>
            
            <div className="user-info">
              <p style={{ marginBottom: '8px' }}><strong>Arquivo:</strong> {cert.nomeArquivo}</p>
              <p style={{ marginBottom: '15px' }}><strong>Data de Upload:</strong> {cert.data}</p>
            </div>

            <button className="btn-outline" onClick={() => abrirCertificado(cert.link)}>
              Visualizar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Certificate;