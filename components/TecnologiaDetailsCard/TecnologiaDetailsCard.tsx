import Image from "next/image";
import InsercaoEstrela from "@/components/InsercaoEstrela/InsercaoEstrela";
 
interface TecnologiaDetailsCardProps {
  tecnologia: {
    title: string;
    description: string;
    image: string;
    rating: number;
  };
  index: number;
}

export default function TecnologiaDetailsCard({ tecnologia, index }: TecnologiaDetailsCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-4 rounded-xl shadow-md bg-white">
      <h2 className="text-2xl font-bold">{tecnologia.title}</h2>
      <p className="text-center text-gray-700">{tecnologia.description}</p>

      <div className="flex justify-center">
        <Image
          src={`/tecnologias/${tecnologia.image}`}
          alt={tecnologia.title}
          width={300}
          height={300}
          className="object-contain rounded-md"
        />
      </div>

      <div className="flex justify-center">
        <div className="p-2 rounded-xl shadow-md bg-black text-3xl w-max">
          <InsercaoEstrela key={index} numEstrela={tecnologia.rating} />
        </div>
      </div>
    </div>
  );
}