import { Checkbox } from "@/components/ui/checkbox";
import { DualRangeSlider } from "@/components/DualRangeSlider";
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const [values, setValues] = useState([0, 100]);
  const { categories } = useProducts();

  const clearFilters = () => {
    return null;
  };

  return (
    <aside className="w-64 shrink-0">
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
            value={values}
            onValueChange={setValues}
            min={0}
            max={100}
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
            {categories.map((category) => (
              <label
                key={category}
                htmlFor={category}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-50"
              >
                <Checkbox
                  id={category}
                  defaultChecked={false}
                  onCheckedChange={() => {}}
                />
                <span className="text-sm text-slate-700 capitalize">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
