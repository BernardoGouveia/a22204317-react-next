'use client'
import { useEffect, useState } from 'react'
import { getLastViewed } from '@/lib/storage'

export default function LastViewedProducts() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    setProducts(getLastViewed())
  }, [])

  return (
    <div className="flex gap-4 overflow-x-auto">
      {products.map(p => (
        <div key={p.id}>
          <img src={p.image} />
          <p>{p.price} €</p>
        </div>
      ))}
    </div>
  )
}
