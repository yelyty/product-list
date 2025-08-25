import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchInput = () => {
  const handleChange = () => null;
  return (
    <div className="relative w-full">
      <SearchIcon
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        aria-hidden
      />
      <Input
        type="search"
        role="searchbox"
        value={""}
        onChange={handleChange}
        placeholder="Search products"
        className="pl-9 pr-9"
      />
    </div>
  );
};

export default SearchInput;
