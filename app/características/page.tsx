import caracteristicas from '@/app/data/caracteristicas.json';
import Caracteristica from '@/components/Caracteristica/Caracteristica';
import Link from 'next/link'


export default function CaracteristicasPage() {
  
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Características do React e Next.js</h2>
      <ul>
        {caracteristicas.map((item, index) => (
          <Link key={index} href={`/caracteristicas/${index}`}>
            <Caracteristica key={index} caracteristica={item} />
          </Link> 
        ))}
      </ul>
    </div>
  );
}