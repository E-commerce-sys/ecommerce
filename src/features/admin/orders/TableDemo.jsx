import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const STATUS_STYLES = {
  pending: "bg-gray-100 border-gray-600",
  preparing: "bg-yellow-100 border-[#FBBF24]",
  shipping: "bg-purple-100 border-[#8B5CF6]",
  delivering: "bg-orange-100 border-[#F97316]",
  arrived: "bg-green-100 border-[#22C55E]",
  cancelled: "bg-red-100 border-red-600",
};

function formatMoney(value) {
  const n = Number(value ?? 0);
  if (Number.isNaN(n)) return "$0.00";
  return `$${n.toFixed(2)}`;
}

function formatDate(iso) {
  if (!iso) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString();
}

function normalizeOrder(raw) {
  const attrs = raw?.attributes ?? {};
  const user = raw?.included?.user?.attributes ?? {};
  const adress = raw?.included?.shippingAddress?.attributes ?? {};
  const items = raw?.included?.OrderItems ?? raw?.included?.orderItems ?? [];
  return {
    id: Number(raw?.id),
    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "-",
    email: user.email ?? "-",
    orderStatus: attrs.status ?? "-",
    address:
      `${adress.houseNumber ?? ""} ${adress.streetName ?? ""} | ${adress.city ?? ""}`.trim() ||
      "-",
    date: formatDate(attrs.createdAt),
    totalPrice: formatMoney(attrs.totalPrice),
    numItems: items.length,
    items: items.map((item) => {
      const itemAttrs = item?.attributes ?? {};
      const variant = item?.included?.productVariant;
      const product = variant?.included?.product?.attributes ?? {};
      const color = variant?.included?.color?.attributes?.name ?? "-";
      const size = variant?.included?.size?.attributes?.sizeLabel ?? "-";
      const quantity = Number(itemAttrs.quantity ?? 0);
      const unit = Number(itemAttrs.unitPrice ?? 0);
      return {
        product: product.nameEn ?? "-",
        productImg: product.primaryImage ?? "",
        price: formatMoney(unit),
        color,
        size,
        quantity,
        subtotal: formatMoney(unit * quantity),
      };
    }),
  };
}

function normalizeStatus(status) {
  return String(status ?? "")
    .trim()
    .toLowerCase();
}

function formatStatusLabel(status) {
  const normalized = normalizeStatus(status);
  if (!normalized) return "-";
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function getStatusBadgeClass(status) {
  const normalized = normalizeStatus(status);
  return (
    STATUS_STYLES[normalized] ?? "bg-gray-100 border-[rgb(var(--color-border))]"
  );
}

export function TableDemo({
  orders = [],
  isEditing,
  selectedOrders,
  toggleOrder,
}) {
  const [expanded, setExpanded] = useState({});
  const rows = useMemo(() => orders.map(normalizeOrder), [orders]);

  const toggleRow = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>#</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead className="text-center">Customer Email</TableHead>
          <TableHead className="text-center">Customer Address</TableHead>
          <TableHead className="text-center">Order Status</TableHead>
          <TableHead className="text-center">Order Date</TableHead>
          <TableHead className="text-center">Num. Items</TableHead>
          <TableHead className="text-center">Total Price</TableHead>
          <TableHead className="text-right pr-4">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((order, index) => (
          <React.Fragment key={index}>
            {/* 🔹 MAIN ROW */}
            <TableRow
              className={`cursor-pointer transition-colors border-b-0 ${
                selectedOrders.includes(order.id)
                  ? "bg-blue-50!"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => toggleRow(index)}
            >
              <TableCell>{order.id || index + 1}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell className="text-center">{order.email}</TableCell>
              <TableCell className="text-center">{order.address}</TableCell>
              <TableCell className="text-center ">
                <span
                  className={`inline-flex min-w-24 items-center justify-center rounded-full border px-1 py-1 text-xs ${getStatusBadgeClass(order.orderStatus)}`}
                >
                  {formatStatusLabel(order.orderStatus)}
                </span>
              </TableCell>
              <TableCell className="text-center">{order.date}</TableCell>
              <TableCell className="text-center">{order.numItems}</TableCell>
              <TableCell className="text-center">{order.totalPrice}</TableCell>
              <TableCell className="text-right pr-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isEditing) toggleOrder(order.id);
                  }}
                  disabled={!isEditing}
                  className={`px-3 py-1 rounded-md text-sm transition
    ${
      selectedOrders.includes(order.id)
        ? "bg-blue-600 text-white"
        : isEditing
          ? "bg-gray-100 text-gray-700 hover:bg-blue-100"
          : "bg-gray-200 text-gray-400 cursor-not-allowed"
    }
  `}
                >
                  Next State
                </button>
              </TableCell>
            </TableRow>

            {/* 🔽 EXPANDED ROW WITH ANIMATION */}
            <TableRow>
              <TableCell colSpan={9} className="p-0">
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expanded[index]
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border shadow-sm m-2 p-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="text-center">Name</TableHead>
                          <TableHead className="text-center">Price</TableHead>
                          <TableHead className="text-center">Color</TableHead>
                          <TableHead className="text-center">Size</TableHead>
                          <TableHead className="text-center">
                            Quantity
                          </TableHead>
                          <TableHead className="text-right pr-4">
                            Sub Total
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {order.items.map((item, i) => (
                          <TableRow key={i}>
                            <TableCell className="h-13 w-13">
                              {item.productImg ? (
                                <img
                                  src={item.productImg}
                                  alt={item.product}
                                  className="h-fit w-fit rounded object-cover"
                                />
                              ) : (
                                "-"
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.product}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.price}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.color}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.size}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.quantity}
                            </TableCell>
                            <TableCell className="text-right pr-4">
                              {item.subtotal}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableDemo;
