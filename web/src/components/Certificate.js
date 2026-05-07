import React, { useState } from 'react';
import '../styles/Funcionario.css';

function Certificate() {
  const [certificados] = useState([
    { id: 1, nome: "IT Fundamentals", emissor: "Microsoft", data: "10/04/2026" },
    { id: 2, nome: "Metodologias Ágeis", emissor: "Scrum.org", data: "22/04/2026" },
    { id: 3, nome: "Fundamentos de Cloud", emissor: "AWS", data: "05/05/2026" }
  ]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Meus Certificados</h1>
      
      <div className="trilhas-grid">
        {certificados.map(cert => (
          <div key={cert.id} className="card">
            <h3 style={{ color: '#85a5ff' }}>{cert.nome}</h3>
            <div className="user-info">
              <p><strong>Emissor:</strong> {cert.emissor}</p>
              <p><strong>Data de Conclusão:</strong> {cert.data}</p>
            </div>
            <button style={btnStyle}>Ver Certificado</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Estilo inline simples só para o botão do certificado
const btnStyle = {
  marginTop: '15px',
  padding: '10px 15px',
  backgroundColor: '#85a5ff',
  color: '#1a1b1e',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%'
};

export default Certificate;