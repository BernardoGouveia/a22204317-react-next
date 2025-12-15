export interface Product{
    id: string;
    title: string;
    description: string;
    price: string;
    image: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface Categoria{
    name: string;
}

