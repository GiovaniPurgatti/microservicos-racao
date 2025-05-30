'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { orderService, Order, OrderItem } from '@/services/order';
import { paymentService, Payment } from '@/services/payment';
import { useRouter } from 'next/navigation';

type PaymentMethod = 'CARTAO' | 'BOLETO' | 'PIX';

export default function Cart() {
    const { items, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CARTAO');
    const router = useRouter();
    const [id, setId] = useState<number | null>();

    const handleCheckout = async () => {
            const userId = localStorage.getItem('userId');
            setId(userId ? parseInt(userId) : null);
        try {
            setIsCheckingOut(true);

            const orderData: Order = {
                clienteId: id!,
                itens: items.map(item => ({
                    produtoId: item.id,
                    quantidade: item.quantity,
                    precoUnitario: item.price
                })),
                status: 'PENDENTE' as const,
                valorTotal: totalPrice,
                dataPedido: new Date().toISOString()
            };
            console.log('Dados do pedido sendo enviados:', orderData);

            // Criar pedido
            const order = await orderService.createOrder(orderData);
            console.log('Resposta da API de Pedidos:', order);

            // Log dos dados do pagamento
            const paymentData: Payment = {
                pedidoId: order.id!,
                valor: totalPrice,
                status: 'PENDENTE' as const,
                metodoPagamento: paymentMethod
            };
            console.log('Dados do pagamento sendo enviados:', paymentData);

            // Criar pagamento
            const createdPayment = await paymentService.createPayment(paymentData);
            console.log('Resposta da API de Pagamentos:', createdPayment);
            clearCart();
            // Limpar carrinho e redirecionar para página de sucesso
            router.push(`/checkout/success?orderId=${order.id}&paymentId=${createdPayment.id}`);
        } catch (error) {
            console.error('Erro ao finalizar compra:', error);
            alert('Erro ao finalizar compra. Tente novamente.');
        } finally {
            setIsCheckingOut(false);
            
        }
    };


    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Seu carrinho está vazio</h2>
                        <p className="text-gray-600 mb-6">Adicione produtos ao seu carrinho para continuar comprando.</p>
                        <button
                            onClick={() => router.push('/')}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Continuar Comprando
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Lista de Produtos */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Seu Carrinho</h2>
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                                        <div className="relative w-24 h-24 flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-600 mb-2">Tipo: {item.type}</p>
                                            <div className="flex items-center justify-between">
                                                <p className="text-lg font-medium text-indigo-600">
                                                    R$ {item.price.toFixed(2)}
                                                </p>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                >
                                                    Remover
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Resumo do Pedido */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>R$ {totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Frete</span>
                                    <span>Grátis</span>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>R$ {totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Forma de Pagamento
                                </label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 font-medium py-2 px-3"
                                >
                                    <option value="CARTAO" className="text-gray-900">Cartão de Crédito</option>
                                    <option value="BOLETO" className="text-gray-900">Boleto</option>
                                    <option value="PIX" className="text-gray-900">PIX</option>
                                </select>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isCheckingOut ? 'Processando...' : 'Finalizar Compra'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 