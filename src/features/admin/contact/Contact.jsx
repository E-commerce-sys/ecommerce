import React from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

function Contact() {
  const loaderData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const contacts = loaderData?.data ?? [];
  const meta = loaderData?.meta ?? {};
  const currentPage = Number(meta.current_page ?? 1);
  const lastPage = Number(meta.last_page ?? 1);
  const pages = buildPageNumbers(currentPage, lastPage);

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-semibold">Contacts</p>
        <p className="text-sm text-gray-500">See user's message here</p>
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>#</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {contacts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-gray-500 py-8"
                >
                  No contact messages found
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact, index) => (
                <React.Fragment key={contact.id || index}>
                  <TableRow>
                    <TableCell>{contact.id}</TableCell>
                    <TableCell>{contact.attributes?.name || "-"}</TableCell>
                    <TableCell>{contact.attributes?.email || "-"}</TableCell>
                    <TableCell>{contact.attributes?.phone || "-"}</TableCell>
                    <TableCell className="max-w-md whitespace-normal break-words">
                      {contact.attributes?.message || "-"}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
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

export default Contact;
