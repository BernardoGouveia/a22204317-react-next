import Image from "next/image";

interface TecnologiaCardProps {
  title: string;
  image: string;
}

export default function TecnologiaCard({ title, image }: TecnologiaCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl shadow-md bg-white">
      <Image
        src={image}
        alt={title}
        width={64}
        height={64}
        className="object-contain"
      />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    
  );
}