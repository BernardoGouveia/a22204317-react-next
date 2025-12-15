"use client";

import{ useState, useEffect } from 'react';

function Relogio() {
  const [hora, setHora] = useState<Date | null>(null);

  useEffect(() => {
    setHora(new Date()); 
    
    //Define o intervalo
    const intervalId = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); 

  if (!hora) {
      return <div className="text-xl font-bold font-mono text-white">--:--:--</div>; 
  }

  const horaFormatada = hora.toLocaleTimeString('pt-BR');

  return (
    <div className="text-xl font-bold font-mono">
      {horaFormatada}
    </div>
  );
}

export default Relogio;