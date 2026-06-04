import React, { useState } from 'react';
import '../styles/NovoColaborador.css';

function NovoColaborador() {
  const [nome, setNome] = useState("");
  const [registro, setRegistro] = useState("");
  const [cargo, setCargo] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [senha, setSenha] = useState(""); 

  const handleCadastrar = async(e) => {
    e.preventDefault();
    
      try {
       const response = await fetch("http://10.110.12.90:5000/cadastro", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
          "username": registro,
          "password": senha, 
          "name": nome,
          "numero_registro": registro,
          "cargo": cargo,
          "departamento": departamento
        })
      })

      if(response.ok){
        alert("Novo colaborador cadastrado com sucesso")
      }
    }catch{
      console.log("erro")
    }
    
    setNome("");
    setRegistro("");
    setCargo("");
    setDepartamento("");
    setSenha("");
  };

  return (
    <div className="cadastro-container">
      <h1 className="cadastro-title">Cadastrar Novo Colaborador</h1>
      
      <div className="cadastro-card">
        <form onSubmit={handleCadastrar} className="cadastro-form">
          
          <div className="form-row">
            <div className="form-group">
              <label>Nome Completo</label>
              <input 
                type="text" 
                placeholder="Ex: Ana Clara Silva" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Número de Registro</label>
              <input 
                type="number" 
                placeholder="Apenas números" 
                value={registro}
                onChange={(e) => setRegistro(e.target.value.replace(/\D/g, ''))}
                required
                maxLength={6}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Cargo</label>
              <input 
                type="text" 
                placeholder="Ex: Analista de Dados" 
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Departamento</label>
              <select 
                value={departamento} 
                onChange={(e) => setDepartamento(e.target.value)}
                required
              >
                <option value="" disabled>Selecione uma área...</option>
                <option value="ti">Tecnologia da Informação (TI)</option>
                <option value="rh">Recursos Humanos (RH)</option>
                <option value="financeiro">Financeiro</option>
                <option value="suporte">Suporte ao Cliente</option>
              </select>
            </div>
          </div>

          {/* NOVA LINHA: Campo de Senha adicionado aqui */}
          <div className="form-row">
            <div className="form-group">
              <label>Senha de Acesso</label>
              <input 
                type="password" 
                placeholder="Defina uma senha para o colaborador" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                maxLength={20}
              />
            </div>
          </div>

          <button type="submit" className="btn-cadastrar">
            Salvar Colaborador
          </button>
        </form>
      </div>
    </div>
  );
}

export default NovoColaborador;