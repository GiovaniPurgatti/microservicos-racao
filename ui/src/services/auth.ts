import axios from 'axios';

const API_URL = 'http://localhost:8085/api/v1';

export interface LoginRequest {
    username: string;
    senha: string;
}

export interface RegisterRequest {
    nome: string;
    email: string;
    senha: string;
    username: string;
}

export interface AuthResponse {
    token: string;
}

export const authService = {
    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await axios.post(`${API_URL}/login`, data);
        console.log('Resposta do login:', response.data);
        const { token } = response.data;
        localStorage.setItem('token', token);
        return response.data;
    },

    async register(data: RegisterRequest): Promise<void> {
        await axios.post(`${API_URL}/usuario`, data);
    },

    logout(): void {
        localStorage.removeItem('token');
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
};

