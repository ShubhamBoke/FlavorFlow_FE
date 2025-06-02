
"use client";
import type { UserRole } from '@/lib/types';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password?: string, role?: UserRole) => Promise<void>; 
  logout: () => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password?: string, role?: UserRole) => Promise<void>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('flavorflow_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('flavorflow_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password?: string) => {
    // In a real app, you'd validate credentials against a backend.
    const res = await fetch(`${BASE_URL}/authenticate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email,
        password: password
      }),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Login Failed");
    }

    const data = await res.json();
    //Save JWT token
    localStorage.setItem('jwt_token', data.jwt);
    setUser(data.user);
    router.push('/'); // Redirect to home after login
  };

  const logout = async () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
    router.push('/login'); // Redirect to login after logout
  };

  const register = async (firstName: string, lastName: string, email: string, password?: string, role: UserRole = UserRole.Member) => {
    // In a real app, you'd send this to a backend.
    const res = await fetch(`${BASE_URL}/register${role}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: email,
        password: password,
        role: role,
      }),
    });
  
    if (!res.ok) {
      const msg = await res.text();
      throw new Error("Registration Failed, Username already taken");
    }
    router.push('/login');
    return res.text();
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
