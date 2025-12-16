'use client'

import useSWR from 'swr'
import { useMemo, useState } from 'react'
import CountryCard from '@/components/CountryCard/CountryCard'

interface Country {
  name:{
    common:string,
    official:string
  } 
  area: number
  population: number
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function PaisesPage() {
  const { data, error, isLoading } = useSWR<Country[]>(
    '/data/paises.json',
    fetcher
  )

  const [search, setSearch] = useState('')
  const [order, setOrder] = useState<'name' | 'population'>('name')

  const filteredData = useMemo(() => {
    if (!data) return []

    let result = data.filter(c =>
      c.name?.common?.includes(search)
    )

    result = [...result].sort((a, b) => {
      if (order === 'name') {
        return a.name.common.localeCompare(b.name.common)
      }
      return b.population - a.population
    })

    return result
  }, [data, search, order])

  if (isLoading) return <p>A carregar países...</p>
  if (error) return <p>Erro ao carregar países.</p>

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Países</h1>

      <div className="flex gap-4 mb-6">
        <input
          className="border rounded px-3 py-2"
          placeholder="Filtrar por nome..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="border rounded px-3 py-2"
          value={order}
          onChange={e => setOrder(e.target.value as 'name' | 'population')}
        >
          <option value="name">Ordenar por nome</option>
          <option value="population">Ordenar por população</option>
        </select>
      </div>

      <section className="grid grid-cols-2 gap-4">
        {filteredData.map(country => (
          <CountryCard key={country.name.common} {...country} />
        ))}
      </section>
    </main>
  )
}
