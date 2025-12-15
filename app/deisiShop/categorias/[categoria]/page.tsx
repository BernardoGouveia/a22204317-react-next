'use client';
import { useParams, useRouter } from 'next/navigation';

import useSWR from 'swr';
import { Product } from '@/models/interfaces';
import ProductBasicCard from '@/components/ProductBasicCard/ProductBasicCard';

export default function CategoriaPage() {
    const params = useParams();
    const router = useRouter();

  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const { data, error, isLoading } = useSWR<Product[], Error>(
    '/api/productsShop',
    fetcher
  );

  if (error) return <p>Erro</p>;
  if (isLoading) return <p>A carregar...</p>;

  const produtos = data?.filter(
    p => p.category === params.categoria
  );

  if (!produtos || produtos.length === 0)
    return <p>Nenhum produto encontrado</p>;

  return (
    <>
    <button
        onClick={() => router.push('/deisiShop/categorias')}
        className="mb-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        ← Voltar às categorias
      </button>
    
    <section className="p-10 m-2">
      <h1 className="text-2xl mb-6 capitalize text-black">
        {params.categoria}
      </h1>

      <div className="flex flex-col gap-6">
        {produtos.map(p => (
          <ProductBasicCard
            key={p.id}
            title={p.title}
            image={p.image}
          />
        ))}
      </div>
    </section>
    
    </>
    
    
  );
}
