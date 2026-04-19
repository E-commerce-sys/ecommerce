import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableDemo({ products = [] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>{"#"}</TableHead>
          <TableHead>Product Image</TableHead>
          <TableHead className="text-center">Product Name</TableHead>
          <TableHead className="text-center">Discount Percentage</TableHead>
          <TableHead className="text-right pr-4">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-gray-500 py-8">
              No products found
            </TableCell>
          </TableRow>
        ) : (
          products.map((product, index) => (
            <React.Fragment key={product.id || index}>
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="h-16 w-16">
                    {product.included?.images?.[0]?.attributes?.image ? (
                      <img
                        className="h-full w-full object-contain rounded"
                        src={product.included.images[0].attributes.image}
                        alt={product.attributes?.nameEn || "Product"}
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                        No image
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-4">
                    <p>{product.attributes?.nameEn || "-"}</p>
                    <p>{product.attributes?.nameKu || "-"}</p>
                    <p>{product.attributes?.nameAr || "-"}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {product.attributes?.discountPercentage
                    ? `${product.attributes.discountPercentage}%`
                    : "-"}
                </TableCell>
                <TableCell className="text-right pr-4">
                  <button className="h-8 w-15 cursor-pointer rounded-sm border border-gray-300 hover:bg-gray-200">
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default TableDemo;
