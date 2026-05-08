// src/pages/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css'; 

function Login() {
  const navigate = useNavigate();
  
  // Mudamos o nome do estado de 'email' para 'registro'
  const [registro, setRegistro] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  // Esta função pega o que o usuário digitou e apaga tudo que NÃO for número
  const handleRegistroChange = (e) => {
    const apenasNumeros = e.target.value.replace(/\D/g, '');
    setRegistro(apenasNumeros);
  };

  return (
    <div className="login-container">
      <h1 className="login-logo">SLA</h1>
      <h2 className="login-welcome">Bem vindo! Faça seu login:</h2>
      
      <form onSubmit={handleLogin} style={{ width: '100%' }}>
        
        <div className="form-group">
          <label htmlFor="registro" className="form-label">
            Digite seu número de registro:
          </label>
          <input
            type="text" /* Mudamos de email para text */
            id="registro"
            className="form-input"
            placeholder="Apenas números" /* Novo placeholder */
            value={registro}
            onChange={handleRegistroChange} /* Chama a nossa função bloqueadora de letras */
            required
            maxLength={8} /* Opcional: limita a quantidade máxima de números */
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha" className="form-label">
            Digite sua senha:
          </label>
          <input
            type="password"
            id="senha"
            className="form-input"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="button-container">
          <button type="submit" className="login-button">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;