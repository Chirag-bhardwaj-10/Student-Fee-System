import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/students/profile")
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  
  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    setUser(response.data);
  };
  
  const register = async (name, email, password) => {
    const response = await api.post("/auth/register", { name, email, password });
    localStorage.setItem("token", response.data.token);
    setUser(response.data);
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  
  // Replace JSX with React.createElement
  return React.createElement(AuthContext.Provider, {
    value: { user, loading, login, register, logout }
  }, children);
};

export const useAuth = () => useContext(AuthContext);