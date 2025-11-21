import React, { useEffect, useState, ReactNode } from "react";
import { User, UserRole, UserStatus } from "@/schemas/User";
import { AuthContext, AuthContextType } from "./AuthContextType";

const LOCAL_AUTH_KEY = "asep_auth";

// Load from localStorage if present
function loadStoredAuth(): { user: User | null; token?: string | null } {
  try {
    const raw = localStorage.getItem(LOCAL_AUTH_KEY);
    if (!raw) return { user: null, token: null };
    const parsed = JSON.parse(raw);
    return { user: parsed.user ?? null, token: parsed.token ?? null };
  } catch (e) {
    console.error("Failed to load stored auth", e);
    return { user: null, token: null };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const stored = loadStoredAuth();
  const [user, setUser] = useState<User | null>(stored.user ?? null);
  const [token, setToken] = useState<string | null | undefined>(stored.token ?? null);

  useEffect(() => {
    // persist to localStorage whenever user or token changes
    try {
      localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify({ user, token }));
    } catch (e) {
      console.error("Failed to persist auth", e);
    }
  }, [user, token]);

  const login = (newUser: User, newToken?: string | null) => {
    setUser(newUser);
    setToken(newToken ?? null);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem(LOCAL_AUTH_KEY);
    } catch (e) {
      console.error("Failed to remove stored auth", e);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const canAccess = (requiredRoles: UserRole[]): boolean => {
    return user ? requiredRoles.includes(user.role) : false;
  };

  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
    hasRole,
    canAccess,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}


