import { paymentApi } from './api';

export interface Payment {
    id?: number;
    pedidoId: number;
    valor: number;
    status: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
    metodoPagamento: 'CARTAO' | 'BOLETO' | 'PIX';
    dataPagamento?: Date;
}

export const paymentService = {
    createPayment: async (payment: Payment) => {
        const response = await paymentApi.post<Payment>('/pagamentos', payment);
        return response.data;
    },

    getPaymentById: async (id: number) => {
        const response = await paymentApi.get<Payment>(`/pagamentos/${id}`);
        return response.data;
    },

    getPaymentByOrderId: async (orderId: number) => {
        const response = await paymentApi.get<Payment>(`/pagamentos/pedido/${orderId}`);
        return response.data;
    }
}; 