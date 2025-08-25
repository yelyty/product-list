import productsData from "../data/products.json";

export function useProducts() {
	return { products: productsData };
}