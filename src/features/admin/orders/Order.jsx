import Button from "@/components/Button";
import TableDemo from "./TableDemo";
import { useState } from "react";

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

      <div className="w-full">
        <TableDemo
          isEditing={isEditing}
          selectedOrders={selectedOrders}
          toggleOrder={toggleOrder}
        />{" "}
      </div>
    </div>
  );
}

export default Order;
