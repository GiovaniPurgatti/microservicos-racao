import Link from 'next/link';
import { Product } from '@/services/catalog';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const getImageUrl = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case 'cachorro':
        return 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&h=500&fit=crop';
      case 'gato':
        return 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=500&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&h=500&fit=crop';
    }
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg">
        <img
          src={getImageUrl(product.tipo)}
          alt={product.nome}
          className="h-64 w-full object-cover object-center group-hover:opacity-90 transition-opacity duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.nome}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{product.tipo}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-indigo-600">
            R$ {product.preco.toFixed(2)}
          </p>
          {product.id && (
            <Link
              href={`/products/${product.id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ver Detalhes
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 