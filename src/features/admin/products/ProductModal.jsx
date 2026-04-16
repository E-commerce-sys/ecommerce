import { Input } from "../../../components/ui/input"
import { useEffect, useState } from "react"
import { Button } from "../../../components/ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../../components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { getCategories } from "../categories/api/getCategories"
import { addProduct,getsubCategories,editProduct } from "./adminProducts"

function ProductModal({
  isOpen,
  setIsOpen,
  isEditMode,
  formData,
  setFormData,
  onSave,
  id
}) {
    // Add these above the component (or inside if data will come from API later)
const [categories, setCategories] = useState([]);
const TAGS = {
  isBestSelling: "Best Selling",
  isFeatured: "Featured",
  isNewArrival: "New Arrival",
  isNew: "New",
};
const [subcategories, setSubcategories] = useState([]);
const [subOpen, setSubOpen] = useState(false);


useEffect(() => {
  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  loadCategories();
}, []);


const [open, setOpen] = useState(false);
const handleCategoryChange = async (categoryId) => {
  setFormData((prev) => ({
    ...prev,
    categoryId,
    subcategoryId: "",
  }));

  try {
    const subs = await getsubCategories(categoryId);
    setSubcategories(subs);
  } catch (err) {
    console.error("Failed to load subcategories", err);
    setSubcategories([]);
  }
};

const handleTagToggle = (key) => {
  setFormData((prev) => {
    const exists = prev.tags?.includes(key);
    return {
      ...prev,
      tags: exists
        ? prev.tags.filter((t) => t !== key)
        : [...(prev.tags || []), key],
    };
  });
};

const handleSubmit = async () => {
  try {
    // -------------------------
    // CLEAN IMAGES (ONLY VALID FILES)
    // -------------------------
    const imagesPayload = (formData.images || [])
      .filter((file) => file instanceof File)
      .map((file, index) => ({
        attributes: {
          image: file,
          isPrimary: index === 0 ? 1 : 0,
        },
      }));

    // -------------------------
    // CLEAN VARIANTS (STRICT OPTIONAL RULE)
    // -------------------------
    const variantsPayload = (formData.variants || [])
      .filter((v) => v?.stock !== undefined && v?.stock !== "")
      .map((v) => {
        const hasColor = v.color?.trim();
        const hasSize = v.size?.trim();

        return {
          attributes: {
            stock: Number(v.stock || 0),
          },

          included: {
            ...(hasColor
              ? {
                  color: {
                    attributes: {
                      name: "Custom",
                      hexCode: v.color,
                    },
                  },
                }
              : {}),

            ...(hasSize
              ? {
                  size: {
                    attributes: {
                      sizeLabel: v.size,
                      extraPrice: v.extraPrice
                        ? Number(v.extraPrice)
                        : 0,
                    },
                  },
                }
              : {}),
          },
        };
      });

    // -------------------------
    // SAFE BOOLEAN NORMALIZATION
    // -------------------------
    const b = formData.attributes || {};

    const payload = {
      data: {
        attributes: {
          nameEn: b.nameEn || "",
          nameAr: b.nameAr || "",
          nameKu: b.nameKu || "",

          descriptionEn: b.descriptionEn || "",
          descriptionAr: b.descriptionAr || "",
          descriptionKu: b.descriptionKu || "",

          price: b.price || "0.00",

          isBestSelling: formData.tags?.includes("isBestSelling") ? 1 : 0,
          isFeatured:    formData.tags?.includes("isFeatured")    ? 1 : 0,
          isNewArrival:  formData.tags?.includes("isNewArrival")  ? 1 : 0,
          isNew:         formData.tags?.includes("isNew")         ? 1 : 0,

          hasDiscount: b.hasDiscount ? 1 : 0,
          discountPercentage: Number(b.discountPercentage || 0),

          hasColor: variantsPayload.some((v) => v.included?.color) ? 1 : 0,
          hasSize: variantsPayload.some((v) => v.included?.size) ? 1 : 0,

          newArrivalImage: b.newArrivalImage instanceof File
            ? b.newArrivalImage
            : null,
        },

        relationships: {
          category: {
            data: {
              type: "category",
              id: Number(
                formData.subcategoryId || formData.categoryId
              ),
            },
          },
        },

        included: {
          images: imagesPayload,
          variants: variantsPayload,
        },
      },
    };

    console.log("🚀 FINAL PAYLOAD:", payload);
    if(isEditMode){
      await editProduct(id, payload);
    }else{
      await addProduct(payload);
    }
    setIsOpen(false);
  } catch (err) {
    console.error("❌ ERROR:", err.response?.data || err);
  }
};


const addVariant = () => {
  setFormData((prev) => ({
    ...prev,
    variants: [
      ...(prev.variants?.length
        ? prev.variants
        : [{ color: "", size: "", stock: "", extraPrice: "" }]),
      { color: "", size: "", stock: "", extraPrice: "" },
    ],
  }));
};

const removeVariant = (index) => {
  setFormData((prev) => ({
    ...prev,
    variants: prev.variants.filter((_, i) => i !== index),
  }));
};
  return (
    <AlertDialog
  open={isOpen}
  onOpenChange={(open) => {
    if (!open && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setIsOpen(open);
  }}
><AlertDialogContent
  className="w-[625px] !max-w-[625px] max-h-[90vh] overflow-auto"
  onOpenAutoFocus={(e) => {
    e.preventDefault();
    // FIX: manually move focus into the dialog so it's not left in aria-hidden #root
    e.currentTarget.querySelector("input, textarea, button")?.focus();
  }}
>

        <AlertDialogHeader>
          <AlertDialogTitle>
            {isEditMode ? "Edit Product" : "Add Product"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isEditMode
              ? "Update the product details below."
              : "Fill in the details to add a new product."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Name (EN / KU / AR) */}
        <div className="grid grid-cols-3 gap-2">
          <Input
            placeholder="Name EN"
            value={formData.attributes.nameEn}
            onChange={(e) =>
              setFormData({ ...formData, attributes: { ...formData.attributes, nameEn: e.target.value } })
            }
          />
          <Input
            placeholder="Name KU"
            value={formData.attributes.nameKu}
            onChange={(e) =>
              setFormData({ ...formData, attributes: { ...formData.attributes, nameKu: e.target.value } })
            }
          />
          <Input
            placeholder="Name AR"
            value={formData.attributes.nameAr}
            onChange={(e) =>
              setFormData({ ...formData, attributes: { ...formData.attributes, nameAr: e.target.value } })
            }
          />
        </div>
        {/* Description (EN / KU / AR) */}
        <textarea
          placeholder="Description English (optional)"
          value={formData.attributes.descriptionEn}
          onChange={(e) =>
            setFormData({ ...formData, attributes: { ...formData.attributes, descriptionEn: e.target.value } })
          }
        className="border rounded p-1"
        />
        <textarea
          placeholder="Description Kurdish (optional)"
          value={formData.attributes.descriptionKu}
          onChange={(e) =>
            setFormData({ ...formData, attributes: { ...formData.attributes, descriptionKu: e.target.value } })
          }
        className="border rounded p-1"
        />
        <textarea
          placeholder="Description Arabic (optional)"
          value={formData.attributes.descriptionAr}
          onChange={(e) =>
            setFormData({ ...formData, attributes: { ...formData.attributes, descriptionAr: e.target.value } })
          }
        className="border rounded p-1"
        />

            <div className="flex flex-col gap-3">

  <div className="flex gap-2">

  {/* Tag */}
  <div className="relative w-1/2">
  {/* Trigger */}
  <button
    type="button"
    onClick={() => setOpen((prev) => !prev)}
    className="w-full h-10 px-4 rounded-full bg-[rgb(var(--color-grey))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-main-3))] text-sm flex items-center justify-between"
  >
    <span>
      {formData.tags?.length
        ? `${formData.tags.length} selected`
        : "Select tags"}
    </span>
  </button>

  {/* Dropdown */}
  {open && (
    <div className="absolute z-50 mt-2 w-full bg-white border border-[rgb(var(--color-border))] rounded-lg shadow-md p-2">
      <div className="space-y-2">
        {Object.entries(TAGS).map(([key, value]) => (
  <div
    key={key}
    className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
  >
    <Checkbox
      checked={formData.tags?.includes(key) ?? false}
      onCheckedChange={() => handleTagToggle(key)}
    />
    <span
      className="text-sm cursor-pointer"
      onClick={() => handleTagToggle(key)}
    >
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </span>
  </div>
))}
      </div>
    </div>
  )}
</div>

  {/* Price */}
  <Input
    placeholder="Price"
    type="text"
    value={formData.attributes.price}
    onChange={(e) => setFormData({ ...formData, attributes: { ...formData.attributes, price: e.target.value } })}
    className="flex-1 min-w-[140px] h-10 px-4 rounded-full bg-[rgb(var(--color-grey))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-main-3))] text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-main))]"
  />
</div>
<div className="flex gap-2">
  {/* Category */}
  {/* FIX 2: handleCategoryChange belongs on Category, not Subcategory */}
<Select
  value={formData.categoryId ? String(formData.categoryId) : ""}
  onValueChange={handleCategoryChange}
>
  <SelectTrigger className="flex-1 min-w-[140px] h-10 px-4 rounded-full bg-[rgb(var(--color-grey))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-main-3))] text-sm">
    <SelectValue placeholder="Category" />
  </SelectTrigger>
  <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
    {categories.map((cat) => (
      <SelectItem key={cat.id} value={String(cat.id)}>
        {cat.attributes.nameEn}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

{/* FIX 3: Subcategory gets its own handler; remove broken open={subOpen} */}
<Select
  value={formData.subcategoryId ? String(formData.subcategoryId) : ""}
  onValueChange={(val) =>
    setFormData((prev) => ({ ...prev, subcategoryId: val }))
  }
>
  <SelectTrigger className="flex-1 min-w-[160px] h-10 px-4 rounded-full">
    <SelectValue placeholder="Subcategory" />
  </SelectTrigger>

  <SelectContent>
    {subcategories.length === 0 ? (
      <div className="p-2 text-sm text-gray-400">
        No subcategories
      </div>
    ) : (
      subcategories.map((sub) => (
        <SelectItem key={sub.id} value={String(sub.id)}>
          {sub.attributes.nameEn}
        </SelectItem>
      ))
    )}
  </SelectContent>
</Select>
</div>
</div>

{/* Images */}

  {/* Images */}
<div className="space-y-2">
  <h3 className="font-semibold">Images</h3>

  {(formData.images?.length ? formData.images : [null]).map((file, index) => (
    <div key={index} className="flex items-center gap-2">
      <input
        type="file"
        accept="image/*"
        className="flex-1 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[rgb(var(--color-primary-1))] file:px-3 file:py-1.5 file:text-sm cursor-pointer"
        onChange={(e) => {
          const selected = e.target.files?.[0] ?? null;

          setFormData((prev) => {
            const updated = [...(prev.images?.length ? prev.images : [null])];
            updated[index] = selected;
            return { ...prev, images: updated };
          });
        }}
      />

      <span className="text-xs w-20">
        {index === 0 ? "Primary" : `Photo ${index + 1}`}
      </span>

      {/* Remove only if NOT primary */}
      {index > 0 && (
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              images: prev.images.filter((_, i) => i !== index),
            }))
          }
          className="text-red-500 text-lg"
        >
          ×
        </button>
      )}
    </div>
  ))}

  {/* Add button */}
  {(formData.images?.length || 1) < 4 && (
    <button
      type="button"
      onClick={() =>
        setFormData((prev) => ({
          ...prev,
          images: [...(prev.images || [null]), null],
        }))
      }
      className="text-sm text-[rgb(var(--color-primary-main))]"
    >
      + Add photo
    </button>
  )}
</div>

        {/* Variants */}
       {/* Variants */}
<div>
  <div className="flex items-center justify-between mb-2">
    <h3 className="font-semibold">Variants</h3>

    <button
      type="button"
      onClick={addVariant}
      className="text-[20px] px-3 py-1 rounded-full text-black"
    >
      +
    </button>
  </div>

  <div className="space-y-2">
    {(formData.variants?.length
      ? formData.variants
      : [{ color: "", size: "", stock: "", extraPrice: "" }]
    ).map((v, index) => (
      <div key={index} className="grid grid-cols-4 gap-2 items-center">

        {/* COLOR */}
        <div className="flex items-center gap-2 w-full">
          <label className="relative w-12 h-10 rounded-full border bg-[rgb(var(--color-grey))] cursor-pointer overflow-hidden flex items-center justify-center">
            <div
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: v.color || "#000000" }}
            />

            <input
              type="color"
              value={v.color || "#000000"}
              onChange={(e) => {
                setFormData((prev) => {
                  const base = prev.variants?.length
                    ? prev.variants
                    : [{ color: "", size: "", stock: "", extraPrice: "" }];

                  const updated = [...base];
                  updated[index] = {
                    ...updated[index],
                    color: e.target.value,
                  };

                  return { ...prev, variants: updated };
                });
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>

          <Input
            placeholder="#000000"
            value={v.color}
            onChange={(e) => {
              setFormData((prev) => {
                const base = prev.variants?.length
                  ? prev.variants
                  : [{ color: "", size: "", stock: "", extraPrice: "" }];

                const updated = [...base];
                updated[index] = {
                  ...updated[index],
                  color: e.target.value,
                };

                return { ...prev, variants: updated };
              });
            }}
          />
        </div>

        {/* SIZE */}
        <Input
          placeholder="Size"
          value={v.size}
          onChange={(e) => {
            setFormData((prev) => {
              const base = prev.variants?.length
                ? prev.variants
                : [{ color: "", size: "", stock: "", extraPrice: "" }];

              const updated = [...base];
              updated[index] = { ...updated[index], size: e.target.value };

              return { ...prev, variants: updated };
            });
          }}
        />

        {/* STOCK */}
        <Input
          placeholder="Stock *"
          type="number"
          value={v.stock}
          onChange={(e) => {
            setFormData((prev) => {
              const base = prev.variants?.length
                ? prev.variants
                : [{ color: "", size: "", stock: "", extraPrice: "" }];

              const updated = [...base];
              updated[index] = { ...updated[index], stock: e.target.value };

              return { ...prev, variants: updated };
            });
          }}
        />

        {/* EXTRA PRICE + DELETE */}
        <div className="flex gap-2">
          <Input
            placeholder="Extra price"
            type="number"
            value={v.extraPrice}
            onChange={(e) => {
              setFormData((prev) => {
                const base = prev.variants?.length
                  ? prev.variants
                  : [{ color: "", size: "", stock: "", extraPrice: "" }];

                const updated = [...base];
                updated[index] = {
                  ...updated[index],
                  extraPrice: e.target.value,
                };

                return { ...prev, variants: updated };
              });
            }}
          />

          {/* Delete only if more than 1 */}
          {(formData.variants?.length || 1) > 1 && (
            <button
              type="button"
              onClick={() => removeVariant(index)}
              className="px-2 rounded text-red-600 text-sm"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>
            {isEditMode ? "Save Changes" : "Add Product"}
          </AlertDialogAction>
        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ProductModal;