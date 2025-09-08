"use client";

import { useRouter, useSearchParams } from "next/navigation";

export type SortOption = "newest" | "price_asc" | "rating_desc";

interface ProductSortProps {
  currentSort: SortOption;
}

const ProductSort = ({ currentSort }: ProductSortProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SortOption;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`/all-shoes?${params.toString()}`, { scroll: false });
  };

  const sortOptions = [
    { value: "newest" as SortOption, label: "Newest Products" },
    { value: "price_asc" as SortOption, label: "Price: Low → High" },
    { value: "rating_desc" as SortOption, label: "Rating: Highest" },
  ];

  return (
    <div className="flex items-center gap-3 mb-6">
      <label htmlFor="sort" className="text-sm font-medium text-muted-foreground">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="w-48 h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:bg-background dark:border-input"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSort;