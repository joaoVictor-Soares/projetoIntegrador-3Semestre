import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className="login-container">
      <h1 className="login-logo">SLA</h1>
      
      <div className="login-form-container">
        <h2>Bem vindo! Faça seu login:</h2>
        
        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Digite seu número de registro (E-mail):</label>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Digite sua senha:</label>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Entrar</button>

        </form>
      </div>
    </div>
  );
}

export default Login;