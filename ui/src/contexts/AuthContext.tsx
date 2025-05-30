'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface User {
    id: number;
    username: string;
}
interface JwtPayload {
  id: number;
  sub: string; // geralmente o username
  email?: string;
  nome?: string;
  exp: number;
  iat: number;
}


interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, senha: string) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();


const login = async (username: string, senha: string) => {
  try {
    const response = await authService.login({ username, senha });

    const token = response.token; 
    const decoded: JwtPayload = jwtDecode(token);

    localStorage.setItem('token', token);
    localStorage.setItem('userId', String(decoded.id));
    localStorage.setItem('username', decoded.sub);

    setIsAuthenticated(true);
    setUser({ id: decoded.id, username: decoded.sub });

    router.push('/');
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};


    const register = async (userData: any) => {
        try {
            await authService.register(userData);
            router.push('/login');
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        localStorage.removeItem('username');
        setIsAuthenticated(false);
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 