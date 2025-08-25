import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortValue } from "@/types";

type SortByProps = {
  sortValue: SortValue;
  setSortValue: (value: SortValue) => void;
};

const SortBy = ({ sortValue, setSortValue }: SortByProps) => {
  return (
    <Select
      value={sortValue ?? ""}
      onValueChange={(v) => setSortValue((v as SortValue) || null)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="low-to-high">Low to High</SelectItem>
        <SelectItem value="high-to-low">High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortBy;
