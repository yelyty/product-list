import { useSearchParams } from "react-router";
import { useProducts } from "@/hooks/useProducts";
import SearchInput from "@/components/SearchInput";
import SortBy from "@/components/SortBy";
import Sidebar from "@/components/Sidebar";

import ProductsGrid from "./ProductsGrid";
import { useEffect } from "react";
import type { SortValue } from "@/types";

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
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

  useEffect(() => {
    const sort = (searchParams.get("sort") as SortValue) ?? ("" as SortValue);
    if (sort && sort !== sortValue) {
      setSortValue(sort);
    }
  }, [searchParams, sortValue, setSortValue]);

  const handleSortChange = (value: SortValue) => {
    setSortValue(value);

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    setSearchParams(params);
  };

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 
                    rounded-xl border bg-white px-4 py-4 shadow-sm mb-6"
      >
        <div className="flex flex-col w-full gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className="flex items-center gap-3 md:ml-3 md:mt-0">
            <SortBy sortValue={sortValue} setSortValue={handleSortChange} />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Sidebar
          categories={categories}
          setExcludedCategories={setExcludedCategories}
          excludedCategories={excludedCategories}
          setPriceRange={setPriceRange}
          priceRange={priceRange}
        />
        <section className="flex-1">
          <ProductsGrid products={products} />
        </section>
      </div>
    </div>
  );
};

export default Catalog;
