export default interface Product {
    _id?: string;
    title: string;
    subtitle: string;
    description: string;
    options: string;
    category: string;
    price: number;
    imageUrl: string;
    imageAlt: string;
    quantity?: number;
}