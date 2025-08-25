import ProductsGrid from "./ProductsGrid";
import CatalogToolbar from "./CatalogToolbarWrapper";
import SortBy from "./SortBy";
import SearchInput from "./SearchInput";
import Sidebar from "./Sidebar";
import { useProducts } from "@/hooks/useProducts";

const Catalog = () => {
  const {
    isLoading,
    products,
    categories,
    searchQuery,
    setSearchQuery,
    sortValue,
    setSortValue,
    excludedCategories,
    setExcludedCategories,
    setPriceRange,
    priceRange,
  } = useProducts();

  return (
    <div className="mx-auto max-w-7xl px-4">
      <CatalogToolbar>
        <div className="flex flex-col w-full gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className="flex items-center gap-3 md:ml-3 md:mt-0">
            <SortBy sortValue={sortValue} setSortValue={setSortValue} />
          </div>
        </div>
      </CatalogToolbar>

      <div className="flex flex-col md:flex-row gap-4">
        <Sidebar
          categories={categories}
          setExcludedCategories={setExcludedCategories}
          excludedCategories={excludedCategories}
          setPriceRange={setPriceRange}
          priceRange={priceRange}
        />
        <main className="flex-1">
          <ProductsGrid products={products} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
};

export default Catalog;
