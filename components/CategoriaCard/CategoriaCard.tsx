import Link from 'next/link';

interface CategoriaCardProps {
  name: string;
}

export default function CategoriaCard({ name }: CategoriaCardProps) {
  return (
    <Link href={`/deisiShop/categorias/${name}`}>
      <div className="cursor-pointer border border-black flex flex-col items-center gap-2 p-4 rounded-xl shadow-md bg-white hover:scale-105 transition">
        <img
          src={`/categorias/${name}.jpg`}
          alt={name}
          width={200}
          height={200}
        />
        <h3 className="text-lg font-semibold text-black">{name}</h3>
      </div>
    </Link>
  );
}
