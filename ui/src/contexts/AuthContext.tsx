'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/auth';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    username: string;
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

    useEffect(() => {
        const loadUser = async () => {
            const token = authService.getToken();
            if (token) {
                try {
                    // Recuperar o username do localStorage
                    const username = localStorage.getItem('username');
                    if (username) {
                        setUser({ id: 1, username }); // Usando ID fixo 1
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.error('Erro ao carregar usuário:', error);
                    authService.logout();
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
        };

        loadUser();
    }, []);

    const login = async (username: string, senha: string) => {
        try {
            const response = await authService.login({ username, senha });
            console.log('Resposta do login no contexto:', response);
            setIsAuthenticated(true);
            
            // Armazenar o username para uso posterior
            localStorage.setItem('username', username);
            setUser({ id: 1, username }); // Usando ID fixo 1
            
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