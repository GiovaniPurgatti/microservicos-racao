'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { orderService } from '@/services/order';
import { paymentService } from '@/services/payment';
import { Order } from '@/services/order';
import { Payment } from '@/services/payment';
import Link from 'next/link';

export default function CheckoutSuccess() {
    const searchParams = useSearchParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [payment, setPayment] = useState<Payment | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const orderId = searchParams.get('orderId');
        const paymentId = searchParams.get('paymentId');

        if (orderId && paymentId) {
            Promise.all([
                orderService.getOrderById(Number(orderId)),
                paymentService.getPaymentById(Number(paymentId))
            ]).then(([orderData, paymentData]) => {
                setOrder(orderData);
                setPayment(paymentData);
                setLoading(false);
            }).catch(error => {
                console.error('Erro ao carregar dados:', error);
                setLoading(false);
            });
        }
    }, [searchParams]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Carregando...</h1>
            </div>
        );
    }

    if (!order || !payment) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Pedido não encontrado</h1>
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                    Voltar para a página inicial
                </Link>
            </div>
        );
    }

    if (!order.valorTotal || !order.status || !order.dataPedido) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Dados do pedido incompletos</h1>
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                    Voltar para a página inicial
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-green-700 mb-2">Pedido Realizado com Sucesso!</h1>
                    <p className="text-gray-800">Obrigado por comprar conosco.</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-900">Detalhes do Pedido</h2>
                        <div className="bg-gray-50 p-4 rounded">
                            <p className="text-gray-900"><span className="font-medium">Número do Pedido:</span> {order.id}</p>
                            <p className="text-gray-900"><span className="font-medium">Status:</span> {order.status}</p>
                            <p className="text-gray-900"><span className="font-medium">Valor Total:</span> R$ {order.valorTotal.toFixed(2)}</p>
                            <p className="text-gray-900"><span className="font-medium">Data:</span> {new Date(order.dataPedido).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-900">Detalhes do Pagamento</h2>
                        <div className="bg-gray-50 p-4 rounded">
                            <p className="text-gray-900"><span className="font-medium">Método:</span> {payment.metodoPagamento}</p>
                            <p className="text-gray-900"><span className="font-medium">Status:</span> {payment.status}</p>
                            <p className="text-gray-900"><span className="font-medium">Valor:</span> R$ {payment.valor.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <Link
                            href="/"
                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                        >
                            Voltar para a página inicial
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 