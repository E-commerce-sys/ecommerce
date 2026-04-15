import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  {
    id: 1,
    name: "Ali",
    email: "ali@example.com",
    orderStatus: "pending",
    totalPrice: "$250.00",
    numItems: 3,
    items: [
      {
        product: "T-Shirt",
        productImg: "/images/t-shirt.jpg",
        price: "$50",
        color: "Red",
        size: "M",
        quantity: 2,
      },
      {
        product: "Jeans",
        productImg: "/images/jeans.jpg",
        price: "$150",
        color: "Blue",
        size: "L",
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Ahmed",
    email: "ahmed@example.com",
    orderStatus: "preparing",
    totalPrice: "$150.00",
    numItems: 2,
    items: [
      {
        product: "Shoes",
        price: "$100",
        color: "Black",
        size: "42",
        quantity: 1,
      },
      {
        product: "Cap",
        price: "$50",
        color: "White",
        size: "Free",
        quantity: 1,
      },
    ],
  },
];

export function TableDemo({ isEditing, selectedOrders, toggleOrder }) {
  const [expanded, setExpanded] = useState({});

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
          <TableHead className="text-center">Order Status</TableHead>
          <TableHead className="text-center">Num. Items</TableHead>
          <TableHead className="text-center">Total Price</TableHead>
          <TableHead className="text-right pr-4">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order, index) => (
          <React.Fragment key={index}>
            {/* 🔹 MAIN ROW */}
            <TableRow
              className={`cursor-pointer hover:bg-gray-50 transition-colors border-b-0 ${
                selectedOrders.includes(order.id) ? "bg-blue-50" : ""
              }`}
              onClick={() => toggleRow(index)}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell className="text-center">{order.email}</TableCell>
              <TableCell className="text-center">{order.orderStatus}</TableCell>
              <TableCell className="text-center">{order.numItems}</TableCell>
              <TableCell className="text-center">{order.totalPrice}</TableCell>
              <TableCell className="text-right pr-4">
                <span
                  onClick={(e) => {
                    e.stopPropagation(); // prevent row expand
                    if (isEditing) toggleOrder(order.id);
                  }}
                  className={` hover:underline ${
                    isEditing
                      ? "hover:text-blue-600 text-gray-600 cursor-pointer"
                      : "text-gray-300 cursor-not-allowed"
                  }`}
                >
                  next state
                </span>
              </TableCell>
            </TableRow>

            {/* 🔽 EXPANDED ROW WITH ANIMATION */}
            <TableRow>
              <TableCell colSpan={7} className="p-0">
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
                            <TableCell>{item.productImg}</TableCell>
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
                              {`$${parseFloat(item.price.slice(1)) * item.quantity}`}
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
