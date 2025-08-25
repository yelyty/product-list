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
    <div>
      <CatalogToolbar>
        <div className="flex-1">
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="flex items-center gap-3">
          <SortBy sortValue={sortValue} setSortValue={setSortValue} />
        </div>
      </CatalogToolbar>
      <div className="flex flex-row gap-4">
        <Sidebar
          categories={categories}
          setExcludedCategories={setExcludedCategories}
          excludedCategories={excludedCategories}
          setPriceRange={setPriceRange}
          priceRange={priceRange}
        />
        <ProductsGrid products={products} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Catalog;
