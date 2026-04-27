import { useState } from "react";
import {
  useLoaderData,
  useSearchParams,
  useRevalidator,
} from "react-router-dom";

import Button from "@/components/Button";
import TableDemo from "./TableDemo";
import { updateOrdersState } from "./api/updateOrdersState";

import { AdminPagination } from "../utils/AdminPagination.jsx";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const IN_PROGRESS_STATUSES = ["pending", "preparing", "shipping", "delivering"];

const IN_PROGRESS_FILTERS = [
  { id: 1, name: "All", value: "all" },
  { id: 2, name: "Pending", value: "Pending" },
  { id: 3, name: "Preparing", value: "Preparing" },
  { id: 4, name: "Shipping", value: "Shipping" },
  { id: 5, name: "Delivering", value: "Delivering" },
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
  const { revalidate } = useRevalidator();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedNextOrders, setSelectedNextOrders] = useState([]);

  const section = searchParams.get("section") || "in-progress";
  const currentStatus = searchParams.get("status") || "all";

  const orders = loaderData?.data ?? [];
  const meta = loaderData?.meta ?? {};
  const currentPage = Number(meta.current_page ?? 1);
  const lastPage = Number(meta.last_page ?? 1);
  const hasItems = orders.length > 0;

  function setSection(value) {
    const next = new URLSearchParams();
    next.set("section", value);
    next.set("page", "1");

    if (value === "in-progress") {
      next.set("status", "all");
    } else if (value === "arrived") {
      next.set("status", "arrived");
    } else if (value === "cancelled") {
      next.set("status", "cancelled");
    }

    setSearchParams(next);
    setIsEditing(false);
    setSelectedNextOrders([]);
  }

  const toggleNextOrder = (orderId) => {
    setSelectedNextOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  };

  async function handleSaveUpdate() {
    if (selectedNextOrders.length === 0) {
      setIsEditing(false);
      return;
    }

    try {
      await updateOrdersState({ orderIds: selectedNextOrders });
      revalidate();
      setSelectedNextOrders([]);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update orders:", err);
    }
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold">Orders</p>
          <p className="text-sm text-gray-500">Manage your orders here</p>
        </div>

        {section === "in-progress" && (
          <div className="flex gap-2">
            {isEditing && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelectedNextOrders([]);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            )}

            <Button
              size="sm"
              variant={isEditing ? "primary" : "outline"}
              disabled={isEditing && selectedNextOrders.length === 0}
              onClick={() => {
                if (isEditing) {
                  void handleSaveUpdate();
                } else {
                  setIsEditing(true);
                }
              }}
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
          </div>
        )}
      </div>

      <div className="flex gap-10 w-full border-b border-[rgb(var(--color-border))]">
        <button
          type="button"
          onClick={() => setSection("in-progress")}
          className={`pb-2 text-sm transition ${
            section === "in-progress"
              ? "border-b-2 border-[rgb(var(--color-primary-main))] font-medium text-[rgb(var(--color-text-main))]"
              : "text-[rgb(var(--color-text-main-3))]"
          }`}
        >
          In Progress
        </button>

        <button
          type="button"
          onClick={() => setSection("arrived")}
          className={`pb-2 text-sm transition ${
            section === "arrived"
              ? "border-b-2 border-green-500 font-medium text-[rgb(var(--color-text-main))]"
              : "text-[rgb(var(--color-text-main-3))]"
          }`}
        >
          Arrived
        </button>

        <button
          type="button"
          onClick={() => setSection("cancelled")}
          className={`pb-2 text-sm transition ${
            section === "cancelled"
              ? "border-b-2 border-red-500 font-medium text-[rgb(var(--color-text-main))]"
              : "text-[rgb(var(--color-text-main-3))]"
          }`}
        >
          Cancelled
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {section === "in-progress" && (
          <div className="flex gap-2 items-center">
            <p className="text-sm font-medium">Filter by status</p>
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
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {IN_PROGRESS_FILTERS.map((st) => (
                    <SelectItem key={st.id} value={st.value}>
                      {st.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="w-full">
          <TableDemo
            orders={orders}
            section={section}
            isEditing={isEditing}
            selectedNextOrders={selectedNextOrders}
            toggleNextOrder={toggleNextOrder}
            onCancelSuccess={() => revalidate()}
          />
        </div>
      </div>

      {hasItems ? (
        <AdminPagination
          currentPage={currentPage}
          lastPage={lastPage}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      ) : null}
    </div>
  );
}

export default Order;
