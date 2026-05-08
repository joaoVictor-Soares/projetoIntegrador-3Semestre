import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css'; 

//O Login agora recebe a função setUserRole como "prop"
function Login({ setUserRole }) {
  const navigate = useNavigate();
  
  const [registro, setRegistro] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Lógica de verificação do Administrador
    if (registro === "123456" && senha === "adm123456") {
      setUserRole("admin"); // Avisa o App.js que é um gestor
    } else {
      setUserRole("user");  // Avisa o App.js que é um funcionário comum
    }

    navigate("/home");
  };

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
            type="text"
            id="registro"
            className="form-input"
            placeholder="Apenas números"
            value={registro}
            onChange={handleRegistroChange}
            required
            maxLength={8}
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