import Link from 'next/link';
import { catalogService } from '@/services/catalog';
import { ProductCard } from '@/components/ProductCard';

export default async function Home() {
  const products = await catalogService.getAllProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Ração de Qualidade para seu Pet
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Encontre as melhores rações para seu animal de estimação. Temos uma grande variedade de produtos para cães, gatos e outros pets.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/products"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ver Produtos
            </Link>
            <Link href="/register" className="text-sm font-semibold leading-6 text-gray-900">
              Criar Conta <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Produtos em Destaque
            </h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
