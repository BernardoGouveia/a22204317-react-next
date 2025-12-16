// lib/storage.ts
const FAVORITES_KEY = 'favorites'
const LAST_VIEWED_KEY = 'lastViewed'

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
}

export function toggleFavorite(id: string) {
  const favs = getFavorites()
  const updated = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
}








export function saveLastViewed(product: any) {
  if (typeof window === 'undefined') return
  const stored = JSON.parse(localStorage.getItem(LAST_VIEWED_KEY) || '[]')
  const updated = [product, ...stored.filter((p: any) => p.id !== product.id)].slice(0, 5)
  localStorage.setItem(LAST_VIEWED_KEY, JSON.stringify(updated))
}

export function getLastViewed() {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem(LAST_VIEWED_KEY) || '[]')
}
