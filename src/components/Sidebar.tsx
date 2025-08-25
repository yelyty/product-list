import { Checkbox } from "@/components/ui/checkbox";
import { DualRangeSlider } from "@/components/DualRangeSlider";
import { Button } from "@/components/ui/button";

type SidebarProps = {
  categories: string[];
  excludedCategories: string[];
  setExcludedCategories: (values: string[]) => void;
  setPriceRange: (values: number[]) => void;
  priceRange: number[];
};

const MIN_PRICE = 0;
const MAX_PRICE = 1000;

const Sidebar = ({
  categories,
  excludedCategories,
  setExcludedCategories,
  setPriceRange,
  priceRange,
}: SidebarProps) => {
  const toggleCategory = (
    category: string,
    checked: boolean | "indeterminate"
  ) => {
    const isChecked = checked === true;

    const next = isChecked
      ? excludedCategories.filter((c) => c !== category)
      : [...excludedCategories, category];

    setExcludedCategories(next);
  };

  const clearFilters = () => {
    setExcludedCategories([]);
    setPriceRange([MIN_PRICE, MAX_PRICE]);
  };

  return (
    <aside className="w-full md:w-64 md:shrink-0">
      <div className="rounded-xl border bg-white px-4 py-4 shadow-sm mb-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Filters</h2>
          <Button onClick={clearFilters}>Clear all</Button>
        </div>

        <div className="h-px bg-slate-100 my-4" />

        {/* Price Range */}
        <section className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Price range
          </h3>
          <DualRangeSlider
            label={(value) => `€${value}`}
            labelPosition="bottom"
            value={priceRange}
            onValueChange={setPriceRange}
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={1}
          />
        </section>

        <div className="h-px bg-slate-100 my-10" />

        {/* Categories */}
        <section>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
            Categories
          </h3>
          <div className="space-y-1.5">
            {categories.map((category) => {
              const isFilteredOut = excludedCategories.includes(category);
              return (
                <label
                  key={category}
                  htmlFor={category}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-50"
                >
                  <Checkbox
                    id={category}
                    checked={!isFilteredOut}
                    onCheckedChange={(checked) =>
                      toggleCategory(category, checked)
                    }
                  />
                  <span className="text-sm text-slate-700 capitalize">
                    {category}
                  </span>
                </label>
              );
            })}
          </div>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
