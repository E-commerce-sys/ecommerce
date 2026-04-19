import React, { useState, useEffect } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import TableDemo from "./TableDemo.jsx";
import { getChildCategories } from "./api/getChildCategories.js";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function buildPageNumbers(current, last) {
  if (!last || last < 1) return [];
  if (last <= 5) return Array.from({ length: last }, (_, i) => i + 1);

  const set = new Set([1, last, current - 1, current, current + 1]);
  return [...set].filter((n) => n >= 1 && n <= last).sort((a, b) => a - b);
}

function Discount() {
  const loaderData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );

  const products = loaderData?.data ?? [];
  const meta = loaderData?.meta ?? {};
  const currentPage = Number(meta.current_page ?? 1);
  const lastPage = Number(meta.last_page ?? 1);
  const pages = buildPageNumbers(currentPage, lastPage);

  const hasDiscountFilter = searchParams.get("hasDiscount") === "true";
  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    async function fetchCategories() {
      try {
        const result = await getChildCategories();
        setCategories(result?.data ?? []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    void fetchCategories();
  }, []);

  const toggleDiscountFilter = () => {
    const next = new URLSearchParams(searchParams);
    if (hasDiscountFilter) {
      next.delete("hasDiscount");
    } else {
      next.set("hasDiscount", "true");
    }
    next.set("page", "1");
    setSearchParams(next);
  };

  const handleCategoryChange = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value === "all") {
      next.delete("category");
    } else {
      next.set("category", value);
    }
    next.set("page", "1");
    setSearchParams(next);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      next.set("search", searchInput.trim());
    } else {
      next.delete("search");
    }
    next.set("page", "1");
    setSearchParams(next);
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-semibold">Discounts</p>
        <p className="text-sm text-gray-500">Manage product's discounts here</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for products..."
              className="w-full rounded-full border border-gray-300 px-3 py-1.75 outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))]"
            />
          </form>
          <button
            type="button"
            onClick={toggleDiscountFilter}
            className={`w-50 cursor-pointer rounded-full border px-3 py-1.75 text-sm transition ${
              hasDiscountFilter
                ? "border-[rgb(var(--color-primary-main))] bg-[rgb(var(--color-primary-main))]/20 font-medium text-[rgb(var(--color-primary-main))]"
                : "border-input bg-input/30 text-muted-foreground"
            }`}
          >
            Discounted Products
          </button>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.attributes?.nameEn || "Unnamed"}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <TableDemo products={products} />
        </div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage <= 1) return;
                const next = new URLSearchParams(searchParams);
                next.set("page", String(currentPage - 1));
                setSearchParams(next);
              }}
            />
          </PaginationItem>
          {pages.map((page, index) => {
            const prev = pages[index - 1];
            const gap = prev != null && page - prev > 1;
            return (
              <React.Fragment key={page}>
                {gap ? (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : null}
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      const next = new URLSearchParams(searchParams);
                      next.set("page", String(page));
                      setSearchParams(next);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              </React.Fragment>
            );
          })}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage >= lastPage) return;
                const next = new URLSearchParams(searchParams);
                next.set("page", String(currentPage + 1));
                setSearchParams(next);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Discount;
