// Login.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css'; 
import { useAuth } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();
  const { loginGlobal } = useAuth();
  
  const [registro, setRegistro] = useState("");
  const [senha, setSenha] = useState("");
  const [user, setUser] = useState([]);
  const [erro, setErro] = useState("")

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`http://10.110.12.90:5000/login/${registro}/${senha}`);

    if (response.ok) {
      const data = await response.json();

      if (data.status === 201) {
        const usuarioObjeto = data.user[0]; 
        console.log("Usuário logado:", usuarioObjeto);

        setUser(usuarioObjeto);
        loginGlobal(usuarioObjeto);

        if (usuarioObjeto?.cargo === "RH") {
          console.log("Acesso administrativo detectado (RH). Redirecionando...");
          navigate("/rh");
        } else {
          console.log("Acesso padrão detectado (ADS/Outros). Redirecionando...");
          navigate("/home");
        }

      } else {
        setErro("Usuário ou senha inválidos");
      }
    }
  } catch (error) {
    console.log("Erro ao tentar fazer login:", error);
    setErro("Erro de conexão com o servidor.");
  }
};

  const handleRegistroChange = (e) => {

    const apenasNumeros = e.target.value.replace(/\D/g, '');

    setRegistro(apenasNumeros);
  };

  return (
    <div className="login-container">

      <h1 className="login-logo">SLA</h1>

      <h2 className="login-welcome">
        Bem vindo! Faça seu login:
      </h2>

      <div>
        {erro}
      </div>
      
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