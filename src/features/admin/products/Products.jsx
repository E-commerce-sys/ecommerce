import { useEffect, useState } from "react"
import { Input } from "../../../components/ui/input"
import Arrow from "../../../assets/icons/arrow-left.svg"
import ProductsTable from "./ProductsTable"
import ProductModal from "./ProductModal"
import ProductPagination from "./ProductPagination"
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
import { getProducts,deleteProduct,getOneProduct } from "./adminProducts"
import { getCategories } from "../categories/api/getCategories"

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
  const [categories, setCategories] = useState([]);
const [subcategories, setSubcategories] = useState([]);
const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
const [subcategoryFilter, setSubcategoryFilter] = useState("");
const [tagFilter, setTagFilter] = useState("");
const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
const [subcategoryDropdownOpen, setSubcategoryDropdownOpen] = useState(false);
const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
const [filterSubcategories, setFilterSubcategories] = useState([]);
const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const TAGS = {
  isBestSelling: "Best Selling",
  isFeatured: "Featured",
  isNewArrival: "New Arrival",
  isNew: "New",
};


  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      const [productsRes, categoriesRes] = await Promise.all([
        getProducts(page, { search, category: subcategoryFilter, tag: tagFilter }),
        getCategories(),
      ]);

      setProducts(productsRes.data);
      setMeta(productsRes.meta);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [page, refresh, search, subcategoryFilter, tagFilter]);

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
const urlToFile = async (url) => {
  const res = await fetch(url);
  const blob = await res.blob();
  const filename = url.split("/").pop();
  return new File([blob], filename, { type: blob.type });
};
  const handleEdit = async (product) => {
  setEditId(product.id);

  // fetch full product with variants
  let fullProduct = product;
  try {
    const res = await getOneProduct(product.id);
    fullProduct = res.data;
  } catch (err) {
    console.error("Failed to fetch full product:", err);
  }

  // convert existing image URLs to File objects
  const existingFiles = await Promise.all(
  (product.included?.images || []).map((img) =>
    urlToFile(img.attributes.image).catch(() => null)
  )
).then((files) => files.filter(Boolean));


  const categoryData = product.included?.category;
  const parentId = categoryData?.relationships?.parent?.data?.id;
  const categoryId = parentId
    ? String(parentId)
    : String(product.relationships?.category?.data?.id);
  const subcategoryId = parentId
    ? String(product.relationships?.category?.data?.id)
    : "";

  if (parentId) {
    const parentCategory = categories.find((cat) => cat.id === Number(parentId));
    setSubcategories(parentCategory?.included?.children || []);
  }

  setFormData({
    attributes: {
      ...emptyProduct.attributes,
      ...product.attributes,
      price: product.attributes.originalPrice,
    },
    images: existingFiles.length ? existingFiles : [null],
    existingImages: [],
    included: {
      variants: fullProduct.included?.variants?.length
        ? fullProduct.included.variants.map((v) => ({
            color: v.included?.color?.attributes?.hexCode || "",
            colorName: v.included?.color?.attributes?.name || "",
            size: v.included?.size?.attributes?.sizeLabel || "",
            stock: v.attributes?.stock || "",
            extraPrice: v.included?.size?.attributes?.extraPrice || "",
          }))
        : [],
    },
    tags: Object.keys(TAGS).filter((key) => !!product.attributes?.[key]),
    categoryId,
    subcategoryId,
  });

  setIsEditMode(true);
  setIsModalOpen(true);
};
const handleCategoryFilterChange = (catId) => {
  setCategoryDropdownOpen(false);
  setSubcategoryFilter("");
  const parent = categories.find((c) => String(c.id) === catId);
  setFilterSubcategories(parent?.included?.children || []);
  setSelectedCategoryName(parent?.attributes.nameEn || "");
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

  const confirmDelete = async () => {
  try {
    await deleteProduct(selectedProduct.id); // ✅ API CALL FIRST

    // ✅ then update UI
    setProducts((prev) =>
      prev.filter((p) => p.id !== selectedProduct.id)
    );

    setIsDeleteOpen(false);
    setSelectedProduct(null);
  } catch (err) {
    console.error("❌ Delete failed:", err.response?.data || err);
  }
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
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-72 bg-[rgb(var(--color-grey))] border border-[rgb(var(--color-primary))] text-[rgb(var(--color-text-main))] placeholder:text-[rgb(var(--color-text-main-2))] rounded-lg px-3 py-2 text-sm"
  />

  {/* Category — just used to load subcategories, not sent to API */}
  <div className="relative">
    <button
      onClick={() => setCategoryDropdownOpen((prev) => !prev)}
      className={`flex items-center gap-2 bg-[rgb(var(--color-grey))] border text-sm px-3 py-2 rounded-lg transition-colors
        ${selectedCategoryName
          ? "border-[rgb(var(--color-primary-main))] text-[rgb(var(--color-primary-main))]"
          : "border-[rgb(var(--color-border))] text-[rgb(var(--color-text-main-3))] hover:bg-[rgb(var(--color-red-soft))] hover:text-[rgb(var(--color-primary-main))] hover:border-[rgb(var(--color-primary-main))]"
        }`}
    >
      <span>{selectedCategoryName || "Category"}</span>
      <img src={Arrow} alt="" className="-rotate-90 w-4 h-4" />
    </button>
    {categoryDropdownOpen && (
      <div className="absolute z-50 mt-2 w-48 bg-white border border-[rgb(var(--color-border))] rounded-lg shadow-md p-2 space-y-1">
        <div
          className="text-sm px-2 py-1 rounded cursor-pointer hover:bg-gray-100"
          onClick={() => { setSelectedCategoryName(""); setFilterSubcategories([]); setSubcategoryFilter(""); setCategoryDropdownOpen(false); }}
        >
          All
        </div>
        {categories.filter((c) => c.attributes.isParent).map((cat) => (
          <div
            key={cat.id}
            className={`text-sm px-2 py-1 rounded cursor-pointer hover:bg-gray-100
              ${selectedCategoryName === cat.attributes.nameEn ? "bg-gray-100 font-medium" : ""}`}
            onClick={() => handleCategoryFilterChange(String(cat.id))}
          >
            {cat.attributes.nameEn}
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Subcategory — this is what actually filters */}
  {filterSubcategories.length > 0 && (
    <div className="relative">
      <button
        onClick={() => setSubcategoryDropdownOpen((prev) => !prev)}
        className={`flex items-center gap-2 bg-[rgb(var(--color-grey))] border text-sm px-3 py-2 rounded-lg transition-colors
          ${subcategoryFilter
            ? "border-[rgb(var(--color-primary-main))] text-[rgb(var(--color-primary-main))]"
            : "border-[rgb(var(--color-border))] text-[rgb(var(--color-text-main-3))] hover:bg-[rgb(var(--color-red-soft))] hover:text-[rgb(var(--color-primary-main))] hover:border-[rgb(var(--color-primary-main))]"
          }`}
      >
        <span>
          {subcategoryFilter
            ? filterSubcategories.find((s) => String(s.id) === subcategoryFilter)?.attributes.nameEn
            : "Subcategory"}
        </span>
        <img src={Arrow} alt="" className="-rotate-90 w-4 h-4" />
      </button>
      {subcategoryDropdownOpen && (
        <div className="absolute z-50 mt-2 w-48 bg-white border border-[rgb(var(--color-border))] rounded-lg shadow-md p-2 space-y-1">
          <div
            className="text-sm px-2 py-1 rounded cursor-pointer hover:bg-gray-100"
            onClick={() => { setSubcategoryFilter(""); setSubcategoryDropdownOpen(false); }}
          >
            All
          </div>
          {filterSubcategories.map((sub) => (
            <div
              key={sub.id}
              className={`text-sm px-2 py-1 rounded cursor-pointer hover:bg-gray-100
                ${subcategoryFilter === String(sub.id) ? "bg-gray-100 font-medium" : ""}`}
              onClick={() => { setSubcategoryFilter(String(sub.id)); setSubcategoryDropdownOpen(false); }}
            >
              {sub.attributes.nameEn}
            </div>
          ))}
        </div>
      )}
    </div>
  )}

  {/* Tag filter */}
  <div className="relative">
    <button
      onClick={() => setTagDropdownOpen((prev) => !prev)}
      className={`flex items-center gap-2 bg-[rgb(var(--color-grey))] border text-sm px-3 py-2 rounded-lg transition-colors
        ${tagFilter
          ? "border-[rgb(var(--color-primary-main))] text-[rgb(var(--color-primary-main))]"
          : "border-[rgb(var(--color-border))] text-[rgb(var(--color-text-main-3))] hover:bg-[rgb(var(--color-red-soft))] hover:text-[rgb(var(--color-primary-main))] hover:border-[rgb(var(--color-primary-main))]"
        }`}
    >
      <span>{tagFilter ? TAGS[tagFilter] : "Tag"}</span>
      <img src={Arrow} alt="" className="-rotate-90 w-4 h-4" />
    </button>
    {tagDropdownOpen && (
      <div className="absolute z-50 mt-2 w-48 bg-white border border-[rgb(var(--color-border))] rounded-lg shadow-md p-2 space-y-1">
        <div
          className="text-sm px-2 py-1 rounded cursor-pointer hover:bg-gray-100"
          onClick={() => { setTagFilter(""); setTagDropdownOpen(false); }}
        >
          All
        </div>
        {Object.entries(TAGS).map(([key, label]) => (
          <div
            key={key}
            className={`text-sm px-2 py-1 rounded cursor-pointer hover:bg-gray-100
              ${tagFilter === key ? "bg-gray-100 font-medium" : ""}`}
            onClick={() => { setTagFilter(key); setTagDropdownOpen(false); }}
          >
            {label}
          </div>
        ))}
      </div>
    )}
  </div>
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
        TAGS={TAGS}
        categories={categories}
        subcategories={subcategories}
        setSubcategories={setSubcategories}
      />

      {/* <div className="flex flex-col items-center gap-4">
                <Pagination />
              </div> */}
      <ProductPagination meta={meta} onPageChange={handlePageChange} />
    </div>
  )
}

export default Products