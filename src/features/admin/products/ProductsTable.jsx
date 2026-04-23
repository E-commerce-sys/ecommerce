import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ProductsTable({ products, onEdit, onDelete }) {
  console.log(products);
  return (
    <Table>
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead className="w-[100px]">{"#"}</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Tag</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => {
          const tags = [
            product.attributes.isBestSelling && "Best Selling",
            product.attributes.isNewArrival && "New Arrival",
            product.attributes.isFeatured && "Featured",
            product.attributes.isNew && "New",
          ].filter(Boolean);
          return (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
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
              <TableCell className="flex flex-col gap-2">
                <span>{product.attributes.nameEn}</span>
                <span>{product.attributes.nameKu}</span>
                <span>{product.attributes.nameAr}</span>
              </TableCell>
              <TableCell>${product.attributes.effectivePrice}</TableCell>
              <TableCell>
                {product.included.category.attributes?.nameEn ?? "-"}
              </TableCell>
              <TableCell>{tags.length ? tags.join(", ") : "-"}</TableCell>
              <TableCell className="">
                <div className="flex gap-2 items-center justify-end">
                  <button
                    className="border border-gray-300 w-15 h-8 rounded-sm hover:bg-gray-200 cursor-pointer"
                    onClick={() => onEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="border border-red-600 bg-red-100 w-15 h-8 rounded-sm hover:bg-red-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(product);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default ProductsTable;
