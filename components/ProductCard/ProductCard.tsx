'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getFavorites, toggleFavorite, saveLastViewed } from '@/lib/storage'

export interface ProductProps {
  id: string
  title: string
  price: string
  image: string
  addRemoveProduct: () => void
  isSelected: boolean
}

export default function ProductCard({
  id,
  title,
  price,
  image,
  addRemoveProduct,
  isSelected,
}: ProductProps) {
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    setIsFav(getFavorites().includes(id))
  }, [id])

  function handleToggleFav() {
    toggleFavorite(id)
    setIsFav(prev => !prev)
  }

  function handleInfoClick() {
    saveLastViewed({
      id,
      title,
      price,
      image: `https://deisishop.pythonanywhere.com${image}`,
    })
  }

  return (
    <article
      className={`
        m-2 p-4 flex flex-col items-center
        rounded-xl shadow-lg
        transition-colors duration-300
        ${isSelected ? 'bg-blue-600' : 'bg-blue-300 hover:bg-blue-400'}
      `}
    >
      <img
        src={`https://deisishop.pythonanywhere.com${image}`}
        alt={title}
        width={150}
        height={150}
        className="rounded-md shadow-md mb-3"
      />

      <p className="font-semibold text-lg text-black mb-3 text-center">{title}</p>

      <p className="font-semibold text-lg text-black mb-3 text-center">
        {Number(price).toFixed(2)} €
      </p>

      {/* ❤️ Favorito */}
      <button
        onClick={handleToggleFav}
        className="px-4 py-2 rounded-full border bg-white hover:bg-gray-100 text-black font-bold transition-colors duration-200 mb-2"
      >
        {isFav ? '❤️ Favorito' : '🤍 Favorito'}
      </button>

      {/* Carrinho (+ / -) */}
      <button
        onClick={addRemoveProduct}
        className={`
          px-4 py-2 rounded-full border 
          ${isSelected ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'}
          text-white font-bold transition-colors duration-200
          mb-2
        `}
      >
        {isSelected ? '-' : '+'}
      </button>

      {/* +info */}
      <Link href={`/deisiShop/products/${id}`} onClick={handleInfoClick}>
        <button
          className="
            px-4 py-2 rounded-full border 
            bg-yellow-500 hover:bg-yellow-400
            text-white font-bold transition-colors duration-200
          "
        >
          +info
        </button>
      </Link>
    </article>
  )
}
