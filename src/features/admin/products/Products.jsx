import { useEffect, useState } from "react"
import { Input } from "../../../components/ui/input"
import Arrow from "../../../assets/icons/arrow-left.svg"
import ProductsTable from "./ProductsTable"
import ProductModal from "./ProductModal"
import Pagination from "./ProductPagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getProducts } from "./adminProducts"

const emptyProduct = {
  attributes: {
    nameEn: "", nameAr: "", nameKu: "",
    descriptionEn: "", descriptionAr: "", descriptionKu: "",
    price: "",
    hasDiscount: false,
    discountPercentage: 0,
    hasSize: false,
    hasColor: false,
    newArrivalImage: null,
  },
  tags: [],           // ["isFeatured", "isNew", ...]
  categoryId: "",
  images: [null],     // File objects
  included: {
    variants: [],     // { colorName, hexCode, sizeName, sizeLabel, extraPrice, stock }
  },
}

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(null);


  useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts(page);

      setProducts(res.data);
      setMeta(res.meta);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [page]);

  // ── Modal state ────────────────────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [isEditMode, setIsEditMode]     = useState(false);
  const [formData, setFormData]         = useState(emptyProduct);

  // ── Delete state ───────────────────────────────────────────────────────────
  const [isDeleteOpen, setIsDeleteOpen]       = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handlePageChange = (newPage) => {
  setPage(newPage);
};
  
  const handleAdd = () => {
    setFormData({ ...emptyProduct });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setFormData({ ...emptyProduct, ...product });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
  try {
    const res = await createProduct(formData); // POST request

    // refresh list after adding
    const updated = await getProducts(page);
    setProducts(updated.data);
    setMeta(updated.meta);

    setIsModalOpen(false);
  } catch (err) {
    console.error(err);
  }
};

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
    setIsDeleteOpen(false);
    setSelectedProduct(null);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen p-8">

      {/* Header */}
      <h1 className="text-3xl font-bold text-[rgb(var(--color-text-main))] mb-8">
        Products
      </h1>

      {/* Toolbar */} 
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search products..."
            className="w-72 bg-[rgb(var(--color-grey))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-main))] placeholder:text-[rgb(var(--color-text-main-2))] rounded-lg px-3 py-2 text-sm"
          />
          <button className="flex items-center gap-2 bg-[rgb(var(--color-grey))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-main-3))] text-sm px-3 py-2 rounded-lg hover:bg-[rgb(var(--color-red-soft))] hover:text-[rgb(var(--color-primary-main))] hover:border-[rgb(var(--color-primary-main))] transition-colors">
            <span>Category</span>
            <img src={Arrow} alt="" className="-rotate-90 w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 bg-[rgb(var(--color-grey))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-main-3))] text-sm px-3 py-2 rounded-lg hover:bg-[rgb(var(--color-red-soft))] hover:text-[rgb(var(--color-primary-main))] hover:border-[rgb(var(--color-primary-main))] transition-colors">
            <span>Tag</span>
            <img src={Arrow} alt="" className="-rotate-90 w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="flex gap-1 w-15 h-9 items-center justify-center bg-[rgb(var(--color-primary-main))] hover:bg-[rgb(var(--color-primary-5))] text-white rounded transition-colors"
        >
          <span>+</span>
          <span>Add</span>
        </button>
      </div>

      {/* Table */}
      {loading ? (
      <p className="text-sm text-muted-foreground">Loading...</p>
    ) : (
      <ProductsTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    )}
      {/* Delete confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-bold text-foreground">{selectedProduct?.name}</span>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add / Edit modal */}
      <ProductModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        isEditMode={isEditMode}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        id={editId}
      />

      {/* <div className="flex flex-col items-center gap-4">
                <Pagination />
              </div> */}
      <Pagination meta={meta} onPageChange={handlePageChange} />
    </div>
  )
}

export default Products