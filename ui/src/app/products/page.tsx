import { catalogService } from '@/services/catalog';
import { ProductCard } from '@/components/ProductCard';

export default async function ProductsPage() {
  const products = await catalogService.getAllProducts();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Nossos Produtos
            </h2>
            <p className="mt-4 text-base text-gray-500">
              Encontre a melhor ração para seu pet
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 