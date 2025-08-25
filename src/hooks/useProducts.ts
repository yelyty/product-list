import { useEffect, useMemo, useState } from "react";
import type { Product, SortValue } from "@/types";
import useDebounce from "./useDebounce";

const MIN_PRICE = 0;
const MAX_PRICE = 1000;

export function useProducts() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [products, setProducts] = useState<Product[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [excludedCategories, setExcludedCategories] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);

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
			.filter((product) => {
				if (excludedCategories.includes(product.category)) {
					return false;
				}

				if (product.price < priceRange[0]) {
					return false;
				}

				if (priceRange[1] < product.price) {
					return false;
				}

				return product.title
					.toLowerCase()
					.includes(debouncedSearch.toLowerCase());
			})
			.sort((a, b) => {
				const x = sortValue === "low-to-high" ? a.price : b.price;
				const y = sortValue === "low-to-high" ? b.price : a.price;

				return x - y;
			});
	}, [debouncedSearch, excludedCategories, priceRange, products, sortValue]);

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
