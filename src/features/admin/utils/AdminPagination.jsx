import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function buildPageNumbers(current, last) {
  if (!last || last < 1) return [];
  if (last <= 5) return Array.from({ length: last }, (_, i) => i + 1);

  const set = new Set([1, last, current - 1, current, current + 1]);
  return [...set].filter((n) => n >= 1 && n <= last).sort((a, b) => a - b);
}

/**
 * URL query `page` pagination for admin list routes.
 * Render only when the list has at least one item (parent checks `items.length > 0`).
 */
export function AdminPagination({
  currentPage,
  lastPage,
  searchParams,
  setSearchParams,
}) {
  const pages = buildPageNumbers(currentPage, lastPage);

  return (
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
  );
}
