import Button from "@/components/Button";
import TableDemo from "./TableDemo";
import { useState } from "react";
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const states = [
  {
    id: 1,
    name: "Pending",
    value: "pending",
    style: "bg-gray-200 border-gray-600",
  },
  {
    id: 2,
    name: "Preparing",
    value: "preparing",
    style: "bg-yellow-200 border-[#FBBF24]",
  },
  {
    id: 3,
    name: "Shipping",
    value: "shipping",
    style: "bg-purple-200 border-[#8B5CF6]",
  },
  {
    id: 4,
    name: "Delivering",
    value: "delivering",
    style: "bg-orange-200 border-[#F97316]",
  },
  {
    id: 5,
    name: "Arrived",
    value: "arrived",
    style: "bg-green-200 border-[#22C55E]",
  },
  {
    id: 6,
    name: "Cancelled",
    value: "cancelled",
    style: "bg-red-200 border-red-600",
  },
];

function buildPageNumbers(current, last) {
  if (!last || last < 1) return [];
  if (last <= 5) return Array.from({ length: last }, (_, i) => i + 1);

  const set = new Set([1, last, current - 1, current, current + 1]);
  return [...set].filter((n) => n >= 1 && n <= last).sort((a, b) => a - b);
}

function Order() {
  const loaderData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const currentStatus = searchParams.get("status") || "all";

  const orders = loaderData?.data ?? [];
  const meta = loaderData?.meta ?? {};
  const currentPage = Number(meta.current_page ?? 1);
  const lastPage = Number(meta.last_page ?? 1);
  const pages = buildPageNumbers(currentPage, lastPage);

  const toggleOrder = (orderId) => {
    setSelectedOrders(
      (prev) =>
        prev.includes(orderId)
          ? prev.filter((id) => id !== orderId) // remove
          : [...prev, orderId], // add
    );
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold">Orders</p>
          <p className="text-sm text-gray-500">Manage your orders here</p>
        </div>

        <div className="flex gap-2">
          {isEditing && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                // ❌ cancel everything
                setSelectedOrders([]);
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          )}

          <Button
            size="sm"
            variant={isEditing ? "primary" : "outline"}
            onClick={() => {
              if (isEditing) {
                console.log("Selected Orders:", selectedOrders);

                // ✅ clear after save
                setSelectedOrders([]);
              }

              setIsEditing((prev) => !prev);
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <p>Filter by states</p>
          <Select
            value={currentStatus}
            onValueChange={(value) => {
              const next = new URLSearchParams(searchParams);
              if (value === "all") {
                next.delete("status");
              } else {
                next.set("status", value);
              }
              next.set("page", "1");

              setSearchParams(next);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>States</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state.id} value={state.value}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <TableDemo
            orders={orders}
            isEditing={isEditing}
            selectedOrders={selectedOrders}
            toggleOrder={toggleOrder}
          />{" "}
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
              <div key={page} className="flex items-center">
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
              </div>
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

export default Order;
