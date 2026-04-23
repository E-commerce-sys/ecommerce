import React, { useState } from "react";
import TableDemo from "./TableDemo";
import { useLoaderData, useSearchParams } from "react-router-dom";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function buildPageNumbers(current, last) {
  if (!last || last < 1) return [];
  if (last <= 5) return Array.from({ length: last }, (_, i) => i + 1);

  const set = new Set([1, last, current - 1, current, current + 1]);
  return [...set].filter((n) => n >= 1 && n <= last).sort((a, b) => a - b);
}

function User() {
  const loaderData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );

  const users = loaderData?.data ?? [];
  const meta = loaderData?.meta ?? {};
  const currentPage = Number(meta.current_page ?? 1);
  const lastPage = Number(meta.last_page ?? 1);
  const pages = buildPageNumbers(currentPage, lastPage);

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
        <p className="text-2xl font-semibold">Users</p>
        <p className="text-sm text-gray-500">Manage users here</p>
      </div>
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-full border border-gray-300 px-3 py-1.75 outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))]"
          />
        </form>
        <div className="w-full">
          <TableDemo users={loaderData} />
        </div>
      </div>

      {lastPage > 1 && (
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
      )}
    </div>
  );
}

export default User;
