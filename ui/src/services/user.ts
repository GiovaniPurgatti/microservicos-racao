import { userApi } from './api';

export interface User {
  id: number;
  Nome: string;
  Email: string;
  Senha: string;
}

export const userService = {
  register: async (user: Omit<User, 'id'>) => {
    const response = await userApi.post<User>('/api/v1/usuario', user);
    return response.data;
  },

  login: async (email: string, senha: string) => {
    const response = await userApi.get<User[]>(`/api/v1/usuario?email=${email}&senha=${senha}`);
    return response.data[0];
  },

  getUserById: async (id: number) => {
    const response = await userApi.get<User>(`/api/v1/usuario/${id}`);
    return response.data;
  },
}; 