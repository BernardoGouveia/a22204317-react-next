
'use client';

import useSWR from 'swr';
import { useParams } from 'next/navigation';
import ProdutoDetalhe from '@/components/ProdutoDetalhe/ProdutoDetalhe';
import { Product } from '@/models/interfaces';



export default function ProdutoPage() {
  const params = useParams();
  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const { data: data, error, isLoading } = useSWR<Product,Error>(
    `https://deisishop.pythonanywhere.com/products/${params.produto}`,
    fetcher
  );

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar produto.</p>;
  if (!data) return <p>Produto não encontrado.</p>;

  return <ProdutoDetalhe
        title={data.title}
        description={data.description}
        price={data.price}
        category={data.category}
   
   />;
}
