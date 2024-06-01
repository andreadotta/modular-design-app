import React, { createContext, useContext, ReactNode } from 'react';
import { AuthUser, useAuthStore } from '@/auth';

type AuthContextType = {
  accessToken: string | null;
  user: AuthUser | null;
  setAccessToken: (token: string) => void;
  setUser: (user: AuthUser | null) => void;
  clearAuth: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken, user, setAccessToken, setUser, clearAuth } =
    useAuthStore();

  const logout = () => {
    clearAuth();
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, user, setAccessToken, setUser, clearAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
