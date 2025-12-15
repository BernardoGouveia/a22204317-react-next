interface ProductBasicCardProps {
  title: string;
  image: string;
}

export default function ProductBasicCard({ title, image }: ProductBasicCardProps) {
  return (
    <div className="border border-black flex flex-col items-center  rounded-xl shadow-md bg-white">
      <img
                src={`https://deisishop.pythonanywhere.com${image}`}
                alt={title}
                width={150}
                height={150}
                className="rounded-md shadow-md mb-3"
        />
      <h3 className="text-lg text-black font-semibold text-center">
        {title}
      </h3>
    </div>
  );
}
