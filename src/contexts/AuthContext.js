import React, { createContext, useState, useEffect } from "react";
import api from "../services/api"; // Importamos a instância personalizada do Axios

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [authToken]);

  const login = async (email, password) => {
    try {
      const response = await api.post("/users", { email, password });

      if (response.status === 201) {
        const token = "fake-token";
        setAuthToken(token);
        setError(null);
      }
    } catch (error) {
      setError("Falha na autenticação. Tente novamente!");
      throw new Error("Falha na autenticação");
    }
  };

  const logout = () => {
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
