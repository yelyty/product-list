import { useEffect, useMemo, useState } from "react";
import type { Product, ProductsByCategory, SortValue } from "@/types";
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
	const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

	const [sortValue, setSortValue] = useState<SortValue>(null);

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
				if (filteredCategories.includes(category)) return acc;
				const filtered = items.filter((p) =>
					p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
				);

				if (filtered.length === 0) return acc;

				const sorted =
					sortValue === "low-to-high"
						? [...filtered].sort(
							(a, b) => (a.price ?? Infinity) - (b.price ?? Infinity)
						)
						: sortValue === "high-to-low"
							? [...filtered].sort(
								(a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity)
							)
							: filtered;

				acc[category] = sorted;
				return acc;
			},
			{}
		);
	}, [products, debouncedSearch, sortValue, filteredCategories]);

	const categories = useMemo(
		() => Array.from(new Set(products.map((p) => p.category))),
		[products]
	);

	return {
		isLoading,
		productsByCategory,
		categories,
		// Search
		searchQuery,
		setSearchQuery,

		// Sort
		sortValue,
		setSortValue,

		// Categories
		filteredCategories,
		setFilteredCategories,
	};
}
