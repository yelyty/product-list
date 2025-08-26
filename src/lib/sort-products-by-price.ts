import type { SortValue, Product } from "@/types";

/**
 * Sorts products based on sort price value (low-to-high or high-to-low)
 */
export function sortProducts(sortValue: SortValue) {
	return (a: Product, b: Product) => {
		if (!sortValue) return 0;
		const [x, y] = sortValue === "low-to-high" ? [a.price, b.price] : [b.price, a.price];
		return x - y;
	};
}