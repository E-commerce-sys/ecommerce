import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { updateProduct } from "./api/updateProduct";
import { tableRowDisplayNumber } from "../utils/tableMeta";

export function TableDemo({ products = [], meta, onUpdateSuccess }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discountValue, setDiscountValue] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setDiscountValue(
      product.attributes?.discountPercentage
        ? String(product.attributes.discountPercentage)
        : "",
    );
    setError("");
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    setError("");

    const numValue = Number(discountValue);
    if (isNaN(numValue) || numValue < 0 || numValue > 100) {
      setError("Please enter a valid discount between 0 and 100");
      return;
    }

    setUpdating(true);
    try {
      const payload = {
        data: {
          attributes: {
            discountPercentage: numValue,
            hasDiscount: numValue > 0,
          },
        },
      };

      await updateProduct(selectedProduct.id, payload);
      setEditDialogOpen(false);
      setSelectedProduct(null);
      setDiscountValue("");
      onUpdateSuccess?.();
    } catch (err) {
      console.error("Failed to update discount:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update discount. Please try again.",
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
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
                  <TableCell>
                    {tableRowDisplayNumber(meta, index)}
                  </TableCell>
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
                    <button
                      onClick={() => handleEditClick(product)}
                      className="h-8 w-15 cursor-pointer rounded-sm border border-gray-300 hover:bg-gray-200"
                    >
                      Edit
                    </button>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>

      <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <AlertDialogContent overlayClassName="bg-black/40">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Discount</AlertDialogTitle>
            <AlertDialogDescription>
              Update the discount percentage for{" "}
              <strong>{selectedProduct?.attributes?.nameEn}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Discount Percentage
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder="Enter discount (0-100)"
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-1 focus:ring-[rgb(var(--color-primary-main))]"
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>

          <AlertDialogFooter>
            
            <AlertDialogCancel
              onClick={() => {
                setEditDialogOpen(false);
                setSelectedProduct(null);
                setDiscountValue("");
                setError("");
              }}
              disabled={updating}
            >
              Cancel
            </AlertDialogCancel>

            <button
              type="button"
              onClick={() => void handleUpdate()}
              disabled={updating}
              className="bg-black text-white px-3 py-1 rounded-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default TableDemo;
