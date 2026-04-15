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
    CouponeCode: "QD35F",
    discount: "20%",
    expireDate: "15/05/2026",
  },
  {
    id: 2,
    name: "Ahmed",
    email: "ahmed@example.com",
    CouponeCode: "XYZ789",
    discount: "15%",
    expireDate: "20/06/2026",
  },
];

function GivenCouponsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>{""}</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead className="text-center">User Email</TableHead>
          <TableHead className="text-center">Coupon Code</TableHead>
          <TableHead className="text-center">Coupon discount</TableHead>
          <TableHead className="text-center">Expire date</TableHead>
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
              <TableCell className="text-center">{order.CouponeCode}</TableCell>
              <TableCell className="text-center">{order.discount}</TableCell>
              <TableCell className="text-center">{order.expireDate}</TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}

export default GivenCouponsTable;
