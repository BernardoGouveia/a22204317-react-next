import Link from 'next/link';

interface ProdutoDetalheProps {
    title: string;
    description: string;
    price: string;
    category: string;
}

export default function ProdutoDetalhe({title,description,price,category }: ProdutoDetalheProps) {
  return (
    <div className="p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="mb-1"><strong>Categoria:</strong> {category}</p>
      <p className="mb-1"><strong>Preço:</strong> {price}0 €</p>
      <p className="mb-4"><strong>Descrição:</strong> {description}</p>
      <Link href="/deisiShop/products">
        <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Voltar à lista de produtos
        </button>
      </Link>
    </div>
  );
}
