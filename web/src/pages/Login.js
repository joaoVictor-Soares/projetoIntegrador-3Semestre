import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css'; 

function Login({ setUserRole }) {
  const navigate = useNavigate();
  
  const [registro, setRegistro] = useState("");
  const [senha, setSenha] = useState("");

  // NOVO: Sempre que a tela de login abrir, o sistema "esquece" quem estava logado
  useEffect(() => {
    setUserRole("user");
    localStorage.removeItem("userRole");
  }, [setUserRole]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (registro === "123456" && senha === "adm123456") {
      setUserRole("admin"); 
      // SE FOR ADMIN: Vai direto para a página de Gestão (RH)
      navigate("/rh"); 
    } else {
      setUserRole("user");  
      // SE FOR UTILIZADOR COMUM: Vai para a página Home de boas-vindas
      navigate("/home"); 
    }
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
            maxLength={20}
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