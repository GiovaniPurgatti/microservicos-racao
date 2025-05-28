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

// Configurar o axios para incluir o token em todas as requisições
axios.interceptors.request.use(
    (config) => {
        const token = authService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratar erros de autenticação
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            authService.logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
); 