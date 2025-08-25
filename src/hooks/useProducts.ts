import { useEffect, useState } from "react";
import type { Product, ProductsByCategory } from "@/types";

export function useProducts() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [productsByCategory, setProductsByCategory] = useState<ProductsByCategory>({});

	const groupProductsByCategory = (jsonData: Product[]) => {
		return jsonData.reduce((acc, product) => {
			acc[product.category] = product;
			return acc;
		}, {} as ProductsByCategory);
	}
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch("/products.json");
				const jsonData: Product[] = await response.json();
				const productsByCategory = groupProductsByCategory(jsonData);
				setProductsByCategory(productsByCategory);
			} catch (error) {
				console.log(error, "error");
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	const categories = Object.keys(productsByCategory);

	return {
		isLoading,
		productsByCategory,
		categories,
	};
}
