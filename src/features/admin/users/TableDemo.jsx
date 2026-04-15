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

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>{""}</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead className="text-center">User Email</TableHead>
          <TableHead className="text-center">User Address</TableHead>
          <TableHead className="text-center">Num. Orders</TableHead>
          <TableHead className="text-center">Canceled Orders</TableHead>
          <TableHead className="text-right pr-4">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order, index) => (
          <React.Fragment key={index}>
            {/* 🔹 MAIN ROW */}
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell className="text-center">{order.email}</TableCell>
              <TableCell className="text-center">{order.orderStatus}</TableCell>
              <TableCell className="text-center">{order.orderStatus}</TableCell>
              <TableCell className="text-center">{order.numItems}</TableCell>
              <TableCell className="text-right pr-4">
                <button className="border border-red-600 bg-red-100 w-15 h-8 rounded-sm hover:bg-red-200 cursor-pointer">
                  Block
                </button>
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableDemo;
