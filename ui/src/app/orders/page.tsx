'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { orderService, Order } from '@/services/order';
import { useAuth } from '@/contexts/AuthContext';

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!isAuthenticated || !user?.id) {
                setLoading(false);
                return;
            }
            
            try {
                const data = await orderService.getOrdersByClientId(user.id);
                setOrders(data);
            } catch (err) {
                console.error('Erro ao carregar pedidos:', err);
                setError('Erro ao carregar pedidos. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isAuthenticated, user?.id]);

    if (!isAuthenticated) {
        return (
            <ProtectedRoute>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">Por favor, faça login para ver seus pedidos.</div>
                </div>
            </ProtectedRoute>
        );
    }

    if (loading) {
        return (
            <ProtectedRoute>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">Carregando pedidos...</div>
                </div>
            </ProtectedRoute>
        );
    }

    if (error) {
        return (
            <ProtectedRoute>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-red-600">{error}</div>
                </div>
            </ProtectedRoute>
        );
    }

    if (orders.length === 0) {
        return (
            <ProtectedRoute>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">Você ainda não tem pedidos.</div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Meus Pedidos</h3>
                </div>
                <div className="border-t border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Valor Total
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Data
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.status}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        R$ {order.valorTotal.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.dataPedido ? new Date(order.dataPedido).toLocaleDateString() : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ProtectedRoute>
    );
} 