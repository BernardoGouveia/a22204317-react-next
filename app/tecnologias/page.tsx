import tecnologias from '@/app/data/tecnologias.json';
import Image from 'next/image';
import TecnologiaCard from '@/components/TecnologiaCard/TecnologiaCard';
import Link from 'next/link'


export default function TecnologiasPage() {
  return (
    <>
      <h2>Tecnologias Exploradas</h2>
      <ul className="grid grid-cols-3 gap-4">
        {tecnologias.map((tech, index) => (
           <Link key={index} href={`/tecnologias/${index}`}>
           
              <TecnologiaCard
              key={index}
              title={tech.title}
              image={`/tecnologias/${tech.image}`}
              />

           </Link> 
        ))}
      </ul>
    </>
  );
}

/*<>
      <h2>Tecnologias Exploradas</h2>
      <ul>
        {tecnologias.map((tech, index) => (
          <li key={index}>
            <h3>{tech.title}</h3>
            <p>{tech.description}</p>
            <p>Rating: {tech.rating}</p>
            <Image
            src={`/tecnologias/${tech.image}`}
            alt={tech.title}
            width={100}
            height={100}
            />
          </li>
          
        ))}
      </ul>
    </>*/