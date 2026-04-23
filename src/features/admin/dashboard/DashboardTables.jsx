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

const products = [
  { id: 1, name: "Product A", stock: 5 },
  { id: 2, name: "Product B", stock: 11 },
  { id: 3, name: "Product C", stock: 25 },
]

const productSalesData = [
  { id: 1, product: "Wireless Headphones", amountSold: 320 },
  { id: 2, product: "Gaming Mouse", amountSold: 210 },
  { id: 3, product: "Mechanical Keyboard", amountSold: 185 },
  { id: 4, product: "USB-C Charger", amountSold: 540 },
  { id: 5, product: "Smart Watch", amountSold: 275 },
  { id: 6, product: "Bluetooth Speaker", amountSold: 410 },
  { id: 7, product: "Laptop Stand", amountSold: 150 },
  { id: 8, product: "Phone Case", amountSold: 690 },
  { id: 9, product: "External SSD 1TB", amountSold: 95 },
  { id: 10, product: "Monitor 27-inch", amountSold: 130 },
]

export function LowStockTable() {
  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden max-w-lg mb-4">
      <Table>
        <TableCaption className="mb-3">
          Low Stock Alert
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>
                {p.stock < 10 ? (
                  <span className="text-red-500">Low</span>
                ) : (
                  <span className="text-green-500">OK</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function BestSellingTable(){
    return( <div className="max-w-lg">
        <Table>
            <TableCaption> A list of best selling products</TableCaption>
            <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Amount Sold</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...productSalesData]
  .sort((a, b) => b.amountSold - a.amountSold)
  .map((p) => (
    <TableRow key={p.id}>
      <TableCell>{p.id}</TableCell>
      <TableCell>{p.product}</TableCell>
      <TableCell>{p.amountSold}</TableCell>
    </TableRow>
))}
        </TableBody>
        </Table></div>
    )
}
