import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const STORAGE_KEY = "app_auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  function persist(u) {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  }

  function login({ username, password }) {
    const users = [
      { username: "admin", password: "adminpass", role: "admin" },
      { username: "user", password: "userpass", role: "user" }
    ];

    const found = users.find(x => x.username === username && x.password === password);
    if (!found) return { ok: false, message: "Неверные учётные данные" };

    const payload = { username: found.username, role: found.role };
    persist(payload);
    return { ok: true, user: payload };
  }

  function logout() {
    persist(null);
  }

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
