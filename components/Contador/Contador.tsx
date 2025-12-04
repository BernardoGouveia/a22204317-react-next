'use client'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'contador:value'
const HISTORY_KEY = 'contador:history'
const MIN = 0
const MAX = 10

export default function Contador() {
  const [count, setCount] = useState<number>(0)
  const [history, setHistory] = useState<number[]>([])

  // Load saved value and history from localStorage on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const hist = localStorage.getItem(HISTORY_KEY)
      if (stored !== null) setCount(Number(stored))
      if (hist) {
        const parsed = JSON.parse(hist) as number[]
        if (Array.isArray(parsed)) setHistory(parsed)
      }
    } catch (e) {
      // ignore parse errors
    }
  }, [])

  // Helper to update count while appending to history and persisting
  const updateTo = (nextUnbounded: number) => {
    const next = Math.max(MIN, Math.min(MAX, nextUnbounded))
    if (next === count) return // no change, skip update
    
    setCount(next)
    const newHistory = [...history, next]
    setHistory(newHistory)
    
    try {
      localStorage.setItem(STORAGE_KEY, String(next))
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory))
    } catch (e) {
      // ignore storage errors
    }
  }

  const increment = () => updateTo(count + 1)
  const decrement = () => updateTo(count - 1)
  const reset = () => updateTo(0)

  const color = count <= 3 ? 'red' : count <= 7 ? 'yellow' : 'green'

  return (
    <div>
      <h2>Contador</h2>
      <p>
        Contador: <span style={{ color, fontWeight: 700 }}>{count}</span> vezes
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={decrement} disabled={count <= MIN} aria-label="Decrementar">
          Decrementar
        </button>
        <button onClick={increment} disabled={count >= MAX} aria-label="Incrementar">
          Incrementar
        </button>
        <button onClick={reset} aria-label="Resetar">Reset</button>
      </div>

      <div>
        <strong>Histórico:</strong>
        {history.length === 0 ? (
          <p>(nenhum)</p>
        ) : (
          <ul>
            {history.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}