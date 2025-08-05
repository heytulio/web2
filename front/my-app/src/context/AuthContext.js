import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api"; // Seu serviço de API

// 1. Cria o Contexto
const AuthContext = createContext();

// 2. Cria o Provedor do Contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para checagem inicial da sessão

  useEffect(() => {
    // Função para verificar se já existe uma sessão ativa no backend
    async function checkSession() {
      try {
        // Chama o endpoint que valida o cookie/token
        const response = await api.get("/login/autenticar");
        setUser(response.data.data[0]); // Define o usuário se a sessão for válida
      } catch (error) {
        // Se der erro (401, etc), não há sessão ativa
        setUser(null);
      } finally {
        setLoading(false); // Termina o carregamento inicial
      }
    }

    checkSession();
  }, []);

  // Função para realizar o login
  async function login(email, senha) {
    const response = await api.post("/login", { email, senha });
    setUser(response.data.data[0]); // Define o usuário no estado global
  }

  // Função para realizar o logoff
  async function logout() {
    await api.post("/login/logoff"); // Chama a rota de logoff no backend
    setUser(null); // Limpa o usuário do estado global
  }

  // isAuthenticated é true se o objeto user não for nulo
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 3. Cria um Hook customizado para facilitar o uso do contexto
export function useAuth() {
  return useContext(AuthContext);
}
