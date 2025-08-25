import { useEffect, useMemo, useState } from "react";
import type { Product, ProductsByCategory } from "@/types";
import useDebounce from "./useDebounce";

const groupProductsByCategory = (products: Product[]): ProductsByCategory => {
	return products.reduce<ProductsByCategory>((groups, product) => {
		const { category } = product;

		if (!groups[category]) {
			groups[category] = [];
		}

		groups[category].push(product);
		return groups;
	}, {});
};

export function useProducts() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [products, setProducts] = useState<Product[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch("/products.json");
				const jsonData: Product[] = await response.json();
				setProducts(jsonData);
			} catch (error) {
				console.log(error, "error");
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	const debouncedSearch = useDebounce(searchQuery, 200);

	const productsByCategory = useMemo(() => {
		const grouped = groupProductsByCategory(products);

		return Object.entries(grouped).reduce<ProductsByCategory>(
			(acc, [category, items]) => {
				const filteredItems = items.filter((p) =>
					p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
				);

				if (filteredItems.length > 0) {
					acc[category] = filteredItems;
				}

				return acc;
			},
			{}
		);
	}, [products, debouncedSearch]);

	const categories = useMemo(
		() => Object.keys(productsByCategory),
		[productsByCategory]
	);
	return {
		isLoading,
		productsByCategory,
		categories,
		// Search
		searchQuery,
		setSearchQuery,
	};
}
