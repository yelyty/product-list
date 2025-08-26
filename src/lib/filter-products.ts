import type { Product } from "@/types";

/**
 * Filters a product based on search query, excluded categories, and price range.
 * 
 * @param product - The product to test
 * @param searchQuery - Search string (debounced outside)
 * @param excludedCategories - List of categories to exclude
 * @param priceRange - Price range tuple [min, max]
 */
export function filterProduct(
	product: Product,
	searchQuery: string,
	excludedCategories: string[],
	priceRange: [number, number]
): boolean {
	if (excludedCategories.includes(product.category)) return false;
	if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
	return product.title.toLowerCase().includes(searchQuery.toLowerCase());
}
