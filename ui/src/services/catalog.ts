import axios from 'axios';
import catalogApi from './api';

export interface Product {
  id: number;
  nome: string;
  tipo: string;
  descricao: string;
  peso: number;
  preco: number;
  estoque: number;
}


export const catalogService = {
  getAllProducts: async () => {
    const response = await catalogApi.get<Product[]>('/catalogo');
    return response.data;
  },

  getProductById: async (id: number) => {
    const response = await catalogApi.get<Product>(`/catalogo/${id}`);
    return response.data;
  }
}; 