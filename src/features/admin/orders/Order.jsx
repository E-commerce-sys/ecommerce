import Button from "@/components/Button";
import TableDemo from "./TableDemo";
import { useState } from "react";

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
  },
  {
    id: 2,
    name: "Preparing",
  },
  {
    id: 3,
    name: "Shipping",
  },
  {
    id: 4,
    name: "Delivering",
  },
  { id: 5, name: "Arrived" },
  {
    id: 6,
    name: "Cancelled",
  },
];

function Order() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);

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

        <Button
          size="sm"
          variant={`${isEditing ? "primary" : "outline"}`}
          onClick={() => {
            if (isEditing) {
              // 🔥 CALL API HERE
              console.log("Selected Orders:", selectedOrders);

              // ✅ CLEAR SELECTION AFTER SAVE
              setSelectedOrders([]);
            }

            // toggle edit mode
            setIsEditing((prev) => !prev);
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {" "}
        <div className="flex gap-2 items-center">
          <p>Filter by State</p>
          <Select>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>States</SelectLabel>
                <SelectItem>All</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state.id} value={String(state.name)}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <TableDemo
            isEditing={isEditing}
            selectedOrders={selectedOrders}
            toggleOrder={toggleOrder}
          />{" "}
        </div>
      </div>
    </div>
  );
}

export default Order;
