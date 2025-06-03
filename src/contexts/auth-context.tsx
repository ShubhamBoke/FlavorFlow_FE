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
 const checkAuth = async () => {
      const jwtToken = localStorage.getItem('jwt_token');
      const storedUser = localStorage.getItem('stored_user') || '';
      if (jwtToken) {
        // In a real application, you would typically validate the token with your backend
        // To keep it simple for this example, we'll assume the presence of a token means authenticated
        // You might want to add a backend call here to get user details based on the token if needed

        // Since the login saves user info in local storage as 'flavorflow_user', let's use that for now
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing stored user:", e);
          localStorage.removeItem('flavorflow_user');
          localStorage.removeItem('jwt_token'); // Remove token if user data is invalid
        }
      }
 setLoading(false);
    };
 checkAuth();
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
    localStorage.setItem('stored_user', JSON.stringify(data.user));
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
