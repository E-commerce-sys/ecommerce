import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "../../../components/ui/input";
import ProductsTable from "./ProductsTable";
import ProductModal from "./ProductModal";
import ProductPagination from "./ProductPagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProducts, deleteProduct, getOneProduct } from "./adminProducts";
import { getCategories } from "../categories/api/getCategories";
import Button from "@/components/Button";

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
  tags: [],
  categoryId: "",
  subcategoryId: "",
  images: [null],
  included: { variants: [] },
};

const TAGS = {
  isBestSelling: "Best Selling",
  isFeatured: "Featured",
  isNewArrival: "New Arrival",
  isNew: "New",
};

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Read filters from URL ──────────────────────────────────────────────────
  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const subcategoryFilter = searchParams.get("category") || "";
  const tagFilter = searchParams.get("tag") || "";
  const selectedCategoryId = searchParams.get("parentCategory") || "";

  const updateParams = (updates) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "" || value === "all") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });
      if (!("page" in updates)) params.set("page", "1");
      return params;
    });
  };

  // ── State ──────────────────────────────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filterSubcategories, setFilterSubcategories] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(emptyProduct);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ── Fetch ──────────────────────────────────────────────────────────────────
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

  // restore filterSubcategories from URL on mount
  useEffect(() => {
    if (selectedCategoryId && categories.length) {
      const parent = categories.find((c) => String(c.id) === selectedCategoryId);
      setFilterSubcategories(parent?.included?.children || []);
    }
  }, [selectedCategoryId, categories]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handlePageChange = (newPage) => updateParams({ page: newPage });

  const handleCategoryFilterChange = (catId) => {
    if (catId === "all") {
      updateParams({ parentCategory: null, category: null });
      setFilterSubcategories([]);
      return;
    }
    const parent = categories.find((c) => String(c.id) === catId);
    setFilterSubcategories(parent?.included?.children || []);
    updateParams({ parentCategory: catId, category: null });
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
    let fullProduct = product;
    try {
      const res = await getOneProduct(product.id);
      fullProduct = res.data;
    } catch (err) {
      console.error("Failed to fetch full product:", err);
    }

    const existingFiles = await Promise.all(
      (fullProduct.included?.images || []).map((img) =>
        urlToFile(img.attributes.image).catch(() => null),
      ),
    ).then((files) => files.filter(Boolean));

    const categoryRelId = fullProduct.relationships?.category?.data?.id;
    const matchedCategory = categories.find((cat) =>
      cat.included?.children?.some((child) => child.id === Number(categoryRelId)),
    );

    let categoryId = "";
    let subcategoryId = "";

    if (matchedCategory) {
      categoryId = String(matchedCategory.id);
      subcategoryId = String(categoryRelId);
      setSubcategories(matchedCategory.included?.children || []);
    } else {
      categoryId = String(categoryRelId);
      subcategoryId = "";
    }

    setFormData({
      attributes: {
        ...emptyProduct.attributes,
        ...fullProduct.attributes,
        price: fullProduct.attributes.originalPrice,
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
      tags: Object.keys(TAGS).filter((key) => !!fullProduct.attributes?.[key]),
      categoryId,
      subcategoryId,
    });

    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(selectedProduct.id);
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
      setIsDeleteOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("❌ Delete failed:", err.response?.data || err);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-10">
      {/* Header */}
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold">Products</p>
          <p className="text-sm text-gray-500">Manage your products here</p>
        </div>
        <Button onClick={handleAdd} size="sm" type="button">Add +</Button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Toolbar */}
        <div className="flex w-full items-center gap-3">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full rounded-full border border-gray-300 px-3 py-1.75 outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))]"
          />

          {/* Category */}
          <Select
            value={selectedCategoryId || "all"}
            onValueChange={handleCategoryFilterChange}
          >
            <SelectTrigger className="w-50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.filter((c) => c.attributes.isParent).map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.attributes.nameEn}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Subcategory */}
          {filterSubcategories.length > 0 && (
            <Select
              value={subcategoryFilter || "all"}
              onValueChange={(val) => updateParams({ category: val === "all" ? null : val })}
            >
              <SelectTrigger className="w-50">
                <SelectValue placeholder="Subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Subcategories</SelectLabel>
                  <SelectItem value="all">All Subcategories</SelectItem>
                  {filterSubcategories.map((sub) => (
                    <SelectItem key={sub.id} value={String(sub.id)}>
                      {sub.attributes.nameEn}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}

          {/* Tag */}
          <Select
            value={tagFilter || "all"}
            onValueChange={(val) => updateParams({ tag: val === "all" ? null : val })}
          >
            <SelectTrigger className="w-50">
              <SelectValue placeholder="Tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tags</SelectLabel>
                <SelectItem value="all">All Tags</SelectItem>
                {Object.entries(TAGS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <ProductsTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
        )}

        {/* Delete confirmation */}
        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-bold text-foreground">{selectedProduct?.attributes?.nameEn}</span>?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
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
          onSuccess={() => setRefresh((prev) => prev + 1)} // ← triggers refresh on add/edit
          id={editId}
          TAGS={TAGS}
          categories={categories}
          subcategories={subcategories}
          setSubcategories={setSubcategories}
        />
      </div>

      <ProductPagination meta={meta} onPageChange={handlePageChange} />
    </div>
  );
}

export default Products;