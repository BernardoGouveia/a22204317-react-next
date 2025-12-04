// deve importar o componente
import Link from 'next/link'

export default function CounterPage() {
    return (
        <main>
            <h1>Counter</h1>
            <Link href="/counter">Counter</Link>
        </main>
    )
}