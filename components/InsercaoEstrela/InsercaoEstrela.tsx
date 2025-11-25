interface estrelaProps {
  numEstrela: number;
}

export default function InsercaoEstrela({ numEstrela }: estrelaProps) {
  const estrelas = [];
  const cheias = Math.floor(numEstrela);
  const temMeia = (numEstrela - cheias >= 0.5);

  for (let i = 0; i < cheias; i++) {
    estrelas.push('★');
  }
  if (temMeia) {
    estrelas.push('⯪'); 
  }
  while (estrelas.length < 5) {
    estrelas.push('☆');
  }

  return <span>{estrelas.join('')}</span>;
}

//link para emojis: https://emojicombos.com/half-star