import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filter = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="low-to-high">Low to High</SelectItem>
        <SelectItem value="high-to-low">High to Low</SelectItem>
        <SelectItem value="top-rated">Top-Rated</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Filter;
