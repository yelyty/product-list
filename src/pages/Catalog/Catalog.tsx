import { useProducts } from "@/hooks/useProducts";
import ProductsGrid from "./ProductsGrid";
import CatalogToolbar from "./CatalogToolbarWrapper";
import SortBy from "./SortBy";
import SearchInput from "./SearchInput";
import Filter from "./Filter";
import { Checkbox } from "@/components/ui/checkbox";

const Catalog = () => {
  const { categories } = useProducts();

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
      <div className="flex flex-row">
        <aside className="w-64 shrink-0 p-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category}
                  htmlFor={category}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-50"
                >
                  <Checkbox
                    id={category}
                    checked={true}
                    onCheckedChange={() => {}}
                  />
                  <span className="text-sm text-slate-600 capitalize">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>
        <ProductsGrid />
      </div>
    </div>
  );
};

export default Catalog;
