'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex p-6 m-2 rounded-2xl shadow bg-gray-100 h-1/2">
     <div className="flex gap-3 w-full">
        <button
          className="flex-1 py-5 text-xl font-semibold bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          onClick={() => router.push('/deisiShop/products')}
        >
          Ir para Produtos
        </button>

        <button
          className="flex-1 py-5 text-xl font-semibold bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
          onClick={() => router.push('/deisiShop/categorias')}
        >
          Ir para Categorias
        </button>
     </div>
    </main>
  );
}
