
export type Product = {
	id: number;
	title: string;
	price: number;
	category: string;
	rating: number;
	description: string;
	images: string[];
	brand: string,
	stock: number,
	createdAt: Date;
}

export type ProductsByCategory = Record<string, Product[]>; 