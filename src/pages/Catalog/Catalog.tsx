import ProductsGrid from "./ProductsGrid";
import CatalogToolbar from "./CatalogToolbarWrapper";
import SortBy from "./SortBy";
import SearchInput from "./SearchInput";
import Filter from "./Filter";

const Catalog = () => {
  return (
    <div>
      <CatalogToolbar>
        <div className="flex-1">
          <SearchInput />
        </div>
        <div className="flex items-center gap-3">
          <Filter />
          <SortBy />
        </div>
      </CatalogToolbar>
      <ProductsGrid />
    </div>
  );
};

export default Catalog;
