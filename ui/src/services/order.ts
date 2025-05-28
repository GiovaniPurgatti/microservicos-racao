import { orderApi } from './api';
import { AxiosError } from 'axios';

export interface OrderItem {
    produtoId: number;
    quantidade: number;
    precoUnitario: number;
}

export interface Order {
    id?: number;
    clienteId: number;
    itens: OrderItem[];
    status: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
    valorTotal: number;
    dataPedido?: string;
}

export interface Payment {
    id?: number;
    pedidoID: number;
}

export const orderService = {
    createOrder: async (order: Order) => {
        try {
            const response = await orderApi.post<Order>('/pedidos', order);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            if (error instanceof AxiosError && error.response) {
                console.error('Detalhes do erro:', error.response.data);
            }
            throw error;
        }
    },

    getOrderById: async (id: number) => {
        const response = await orderApi.get<Order>(`/pedidos/${id}`);
        return response.data;
    },

    getOrdersByClientId: async (clientId: number) => {
        const response = await orderApi.get<Order[]>(`/pedidos/cliente/${clientId}`);
        return response.data;
    }
}; 