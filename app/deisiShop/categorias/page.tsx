'use client'

import useSWR from 'swr'
import CategoriaCard from '@/components/CategoriaCard/CategoriaCard'

export default function Page() {

  // Fetch de Dados
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR<{ name: string }[], Error>(
    '/api/categoriasShop',
    fetcher
  )
  // Renderização de Estados
  if (error) return <div className="text-center text-red-500 mt-20">Erro ao carregar categorias.</div>
  if (isLoading) return <div className="text-center mt-20">Carregando...</div>
  if (!data || data.length === 0) return <div className="text-center mt-20">Nenhuma categoria encontrada.</div>

  return (
    <section className="h-full w-full flex justify-center bg-gray-50 py-10">
       <article className="w-full max-w-6xl flex flex-wrap justify-around gap-6 p-4">
        {data.map((m, index) => (
          <CategoriaCard
            key={index}
            name={m.name}
          />
        ))}
      </article>
    </section>
  )
}
