import { useEffect, useMemo, useState } from "react";
import type { Product, SortValue } from "@/types";
import { MAX_PRICE, MIN_PRICE } from "@/consts";
import { filterProduct } from "@/lib/filter-products";
import { sortProducts } from "@/lib/sort-products-by-price";
import useDebounce from "./useDebounce";

export function useProducts() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [products, setProducts] = useState<Product[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [excludedCategories, setExcludedCategories] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);

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

	const visibleProducts = useMemo(() => {
		return products
			.filter(product =>
				filterProduct(product, debouncedSearch, excludedCategories, priceRange)
			)
			.sort(sortProducts(sortValue));
	}, [products, debouncedSearch, excludedCategories, priceRange, sortValue]);

	const categories = useMemo(
		() => Array.from(new Set(products.map((p) => p.category))),
		[products]
	);

	return {
		isLoading,
		products: visibleProducts,
		categories,
		// Search
		searchQuery,
		setSearchQuery,

		// Sort
		sortValue,
		setSortValue,

		// Categories
		excludedCategories,
		setExcludedCategories,

		// Price Range
		priceRange,
		setPriceRange,
	};
}
