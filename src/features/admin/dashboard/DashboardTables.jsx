"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function LowStockTable({ data }) {
  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden max-w-lg mb-4">
      <Table>
        <TableCaption className="mb-3">Low Stock Alert</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.productId}</TableCell>
              <TableCell>{p.productName}</TableCell>
              <TableCell>{p.color ?? "—"}</TableCell>
              <TableCell>{p.size ?? "—"}</TableCell>
              <TableCell>
                {p.stock === 0 ? (
                  <span className="text-red-500 font-medium">Out of stock</span>
                ) : p.stock <= 3 ? (
                  <span className="text-orange-500 font-medium">{p.stock} left</span>
                ) : (
                  <span className="text-yellow-500 font-medium">{p.stock} left</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function BestSellingTable({ data  }) {
  return (
    <div className="max-w-lg">
      <Table>
        <TableCaption>A list of best selling products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Amount Sold</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...data]
            .sort((a, b) => b.amountSold - a.amountSold)
            .map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.amountSold}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}