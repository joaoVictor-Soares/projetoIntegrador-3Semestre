// src/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializa o estado lendo o JSON do usuário que foi salvo no localStorage
  const [usuario, setUsuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuario_projeto");
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  // Função para salvar os dados ao fazer login
  const loginGlobal = (dadosUsuario) => {
    localStorage.setItem("usuario_projeto", JSON.stringify(dadosUsuario));
    setUsuario(dadosUsuario);
  };

  // Função para limpar a memória ao deslogar
  const logoutGlobal = () => {
    localStorage.removeItem("usuario_projeto");
    setUsuario(null);
  };

  // Atalho para pegar o cargo (userRole) direto do objeto do usuário
  // Se o seu backend retornar o campo "cargo", usamos ele. Caso contrário, assume "user"
  const userRole = usuario?.cargo || "user";

  return (
    <AuthContext.Provider value={{ usuario, userRole, loginGlobal, logoutGlobal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);