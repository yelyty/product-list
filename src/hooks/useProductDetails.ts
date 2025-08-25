import { useProducts } from "./useProducts";

const useProductDetails = (productId: number) => {
	const { products } = useProducts();

	return products.find((product) => product.id === productId);
}

export default useProductDetails;