
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

  const login = async (email: string, password?: string, roleInput?: UserRole) => {
    // In a real app, you'd validate credentials against a backend.
    // For mock, we'll use the email to determine role if not provided, or default.
    let determinedRole = UserRole.Member;
    if (roleInput) {
      determinedRole = roleInput;
    } else if (email.includes('admin@')) {
      determinedRole = UserRole.Admin;
    } else if (email.includes('manager@')) {
      determinedRole = UserRole.Manager;
    }
    
    const mockUser: AuthUser = {
      id: '1', // Static ID for simplicity in mock
      firstName: email.split('@')[0] || 'Demo',
      lastName: 'User',
      email: email,
      role: determinedRole,
    };
    localStorage.setItem('flavorflow_user', JSON.stringify(mockUser));
    setUser(mockUser);
    router.push('/'); // Redirect to home after login
  };

  const logout = async () => {
    localStorage.removeItem('flavorflow_user');
    setUser(null);
    router.push('/login'); // Redirect to login after logout
  };

  const register = async (firstName: string, lastName: string, email: string, password?: string, role: UserRole = UserRole.Member) => {
    // In a real app, you'd send this to a backend.
    const mockUser: AuthUser = { id: Date.now().toString(), firstName, lastName, email, role };
    localStorage.setItem('flavorflow_user', JSON.stringify(mockUser));
    setUser(mockUser);
    router.push('/'); // Redirect to home after registration
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
