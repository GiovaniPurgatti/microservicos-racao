import axios from 'axios';

export interface Product {
  id: number;
  nome: string;
  tipo: string;
  descricao: string;
  peso: number;
  preco: number;
  estoque: number;
}

const API_URL = 'http://localhost:8084';

export const catalogService = {
  getAllProducts: async () => {
    const response = await axios.get<Product[]>(`${API_URL}/api/v1/catalogo`);
    return response.data;
  },

  getProductById: async (id: number) => {
    const response = await axios.get<Product>(`${API_URL}/api/v1/catalogo/${id}`);
    return response.data;
  }
}; 