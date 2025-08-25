import ProductsGrid from "./ProductsGrid";
import CatalogToolbar from "./CatalogToolbarWrapper";
import SortBy from "./SortBy";
import SearchInput from "./SearchInput";
import Sidebar from "./Sidebar";
import { useProducts } from "@/hooks/useProducts";

const Catalog = () => {
  const {
    isLoading,
    productsByCategory,
    categories,
    searchQuery,
    setSearchQuery,
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
          <SortBy />
        </div>
      </CatalogToolbar>
      <div className="flex flex-row gap-4">
        <Sidebar />
        <ProductsGrid products={productsByCategory} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Catalog;
