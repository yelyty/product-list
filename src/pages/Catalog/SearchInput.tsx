import type { ChangeEvent } from "react";
import { Search as SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

type SearchInputProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

const SearchInput = ({ searchQuery, setSearchQuery }: SearchInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="relative w-full">
      <SearchIcon
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        aria-hidden
      />
      <Input
        type="search"
        role="searchbox"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search products"
        className="pl-9 pr-9"
      />
    </div>
  );
};

export default SearchInput;
