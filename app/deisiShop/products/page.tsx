'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { Product } from '@/models/interfaces'
import ProductCard from '@/components/ProductCard/ProductCard'
import useSWR from 'swr'
import { Spinner } from '@/components/ui/spinner'
import { useMemo } from 'react'

export default function page() {
  //Gestao de Estados
  const [productsList, setProductList] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')
  const [student, setStudent] = useState<boolean>(false)
  const [coupon, setCoupon] = useState<string>('')
  const [buying, setBuying] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [name, setName] = useState<string>('')
  

//Estados para ordenação
  const [sortName, setSortName] = useState<'asc' | 'desc' | ''>('')
  const [sortPrice, setSortPrice] = useState<'asc' | 'desc' | ''>('')

//Fetch de Dados
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR<Product[], Error>('/api/productsShop', fetcher)



  const filteredData = useMemo(() => {
    if (!data) return []

    let result = data.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )

    // Ordenar por nome
    if (sortName) {
      result = result.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return sortName === 'asc' ? -1 : 1
        if (a.title.toLowerCase() > b.title.toLowerCase()) return sortName === 'asc' ? 1 : -1
        return 0
      })
    }

    // Ordenar por preço
    if (sortPrice) {
      result = result.sort((a, b) =>
        sortPrice === 'asc' ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price)
      )
    }

    return result
  }, [search, data, sortName, sortPrice])

  //
  //D. Funcoes utilitarias
  function toggleItemList(list: string[], item: string): string[] {
    return list.includes(item) ? list.filter(i => i != item) : [...list, item];
  }
  //Handlers (interacao do utilizador)
  function addRemoveProduct(product: string) {
    setProductList((prev) => toggleItemList(prev, product))
  }


//Efeitos
  useEffect(() => {
    const localProductsList = localStorage.getItem('productsList') || '[]';
    setProductList(JSON.parse(localProductsList));
  }, [])

  useEffect(() => {
    localStorage.setItem('productsList', JSON.stringify(productsList))
  }, [productsList])

  // Renderizacao de Componentes
  const total = useMemo(() => {
    if (!data) return 0
    return productsList.reduce((acc, title) => {
      const prod = data.find(p => p.title === title)
      return acc + (prod ? Number(prod.price) : 0)
    }, 0)
  }, [productsList, data])

  async function buy() {
    if (!data) return
    const productIds = productsList.map(title => {
      const prod = data.find(p => p.title === title)
      return prod ? prod.id : null
    }).filter((id): id is string => id !== null)

    setBuying(true)
    setMessage('')
    try {
      const res = await fetch('https://deisishop.pythonanywhere.com/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: productIds, name, student, coupon })
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setMessage(json?.message || res.statusText || 'Erro ao comprar')
        return
      }
      setProductList([])
      localStorage.setItem('productsList', JSON.stringify([]))
      setMessage(json?.message || 'Compra efetuada com sucesso')
    } catch (e: any) {
      setMessage(e?.message || 'Erro ao comprar')
    } finally {
      setBuying(false)
    }
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        Erro ao carregar os dados.
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner className="size-6 text-yellow-600" />
      </div>
    )
  }
  if (!data) return <div>No data</div>



  return <section>
    <section className='flex justify-between'>
    <input
      type="text"
      placeholder="Procurar..."
      className="border border-black rounded px-3 py-2  w-40"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    {/* Select para ordenar por nome */}
        <select
          value={sortName}
          onChange={e => setSortName(e.target.value as 'asc' | 'desc' | '')}
          className="border border-black rounded px-3 py-2"
        >
          <option value="">Ordenar por nome</option>
          <option value="asc">Nome ascendente</option>
          <option value="desc">Nome descendente</option>
        </select>

        {/* Select para ordenar por preço */}
        <select
          value={sortPrice}
          onChange={e => setSortPrice(e.target.value as 'asc' | 'desc' | '')}
          className="border border-black rounded px-3 py-2"
        >
          <option value="">Ordenar por preço</option>
          <option value="asc">Preço ascendente</option>
          <option value="desc">Preço descendente</option>
        </select>
    </section>

    <section className='h-full flex'>

      <article className='overflow-auto w-1/3 bg-gray-200 p-2 m-2'>
        <p className='p-2 font-semibold'>Produtos Escolhidos:</p>
        <p className='p-2 font-semibold'>Total: {total.toFixed(2)} €</p>
        <div className='p-2'>
          <label className='flex items-center gap-2'>
            <input
              type="checkbox"
              checked={student}
              onChange={(e) => setStudent(e.target.checked)}
            />
            Estudante DEISI
          </label>

          <label className='block mt-2'>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border ml-2 px-2 py-1 w-32'
              placeholder='Nome'
            />
          </label>

          <label className='block mt-2'>
            Cupom:
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className='border ml-2 px-2 py-1 w-32'
              placeholder='Cupom'
            />
          </label>

          <div className='mt-3'>
            <button
              onClick={buy}
              disabled={buying || productsList.length === 0}
              className='bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-50'
            >
              {buying ? 'Comprando...' : 'Comprar'}
            </button>
          </div>

          {message && <p className='mt-2'>{message}</p>}
        </div>
        {productsList.map(p => (
          <div key={p} className='p-2 bg-gray-400 text-black m-2 rounded'>
            {p}
          </div>
        ))}
      </article>

      {/* Grid de produtos */}
      <article className='overflow-auto w-2/3 p-2 grid grid-cols-2 gap-2'>
        {filteredData.map(p => (
        
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            price={p.price}
            image={p.image}
            addRemoveProduct={() => addRemoveProduct(p.title)}
            isSelected={productsList.includes(p.title)}
          />
        ))}
      </article>
    </section>

  </section>
}