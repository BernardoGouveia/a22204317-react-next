'use client';

import caracteristicas from '@/app/data/caracteristicas.json';

import { useParams, useRouter } from 'next/navigation';
import Botao from '@/components/Botao/Botao';

export default function CaracteristicaPage() {
  const params = useParams();
  const router = useRouter();
  const index = Number(params.caracteristica);
  const caracteristica = caracteristicas[index];
  
  const handleClick = () => {
    router.back(); 
  };



  return (
    <>
    
    <br></br>
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-black py-8 gap-4">
      {caracteristica}
      <br></br>
      <Botao label="< Voltar" onClick={handleClick} />
    </div>
    </>
    
  );
}