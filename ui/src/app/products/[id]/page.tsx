'use client';

import { catalogService, Product } from '@/services/catalog';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'react-hot-toast';
import { useState, useEffect, use } from 'react';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params);
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await catalogService.getProductById(parseInt(resolvedParams.id));
        setProduct(data);
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
        setError('Não foi possível carregar o produto. Por favor, tente novamente.');
        toast.error('Erro ao carregar produto');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600 mb-4">{error}</p>
        <Link
          href="/products"
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          Voltar para Produtos
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-600 mb-4">Produto não encontrado</p>
        <Link
          href="/products"
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          Voltar para Produtos
        </Link>
      </div>
    );
  }

  const getImageUrl = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case 'cachorro':
        return 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=600&fit=crop';
      case 'gato':
        return 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop';
    }
  };

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success('Produto adicionado ao carrinho!');
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Imagem do Produto */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
              <img
                src={getImageUrl(product.tipo)}
                alt={product.nome}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Detalhes do Produto */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.nome}</h1>
            
            <div className="mt-3">
              <h2 className="sr-only">Informações do Produto</h2>
              <p className="text-3xl tracking-tight text-indigo-600">R$ {product.preco.toFixed(2)}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Tipo</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{product.tipo}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Descrição</h3>
              <div className="mt-2 space-y-6">
                <p className="text-sm text-gray-500">{product.descricao}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Peso</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{product.peso} kg</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Estoque</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{product.estoque} unidades</p>
              </div>
            </div>

            <div className="mt-10 flex">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Adicionar ao Carrinho
              </button>
            </div>

            <div className="mt-6">
              <Link
                href="/products"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                ← Voltar para Produtos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 