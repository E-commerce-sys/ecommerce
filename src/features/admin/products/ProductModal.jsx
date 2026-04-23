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
import { addProduct,getsubCategories,editProduct } from "./adminProducts"

function ProductModal({
  isOpen,
  setIsOpen,
  isEditMode,
  formData,
  setFormData,
  onSuccess,
  id,
  TAGS,
  categories,
  subcategories,
  setSubcategories
}) {

const [subOpen, setSubOpen] = useState(false);
const [open, setOpen] = useState(false);
// handleCategoryChange in modal
const handleCategoryChange = (categoryId) => {
  setFormData((prev) => ({ ...prev, categoryId, subcategoryId: "" }));

  const parent = categories.find((cat) => cat.id === Number(categoryId));
  setSubcategories(parent?.included?.children || []);
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
    const fd = new FormData();

    const b = formData.attributes || {};
    const variants = formData.included?.variants || [];

    // ── Attributes ──────────────────────────────
    fd.append("data[attributes][nameEn]",             b.nameEn || "");
    fd.append("data[attributes][nameAr]",             b.nameAr || "");
    fd.append("data[attributes][nameKu]",             b.nameKu || "");
    fd.append("data[attributes][descriptionEn]",      b.descriptionEn || "");
    fd.append("data[attributes][descriptionAr]",      b.descriptionAr || "");
    fd.append("data[attributes][descriptionKu]",      b.descriptionKu || "");
    fd.append("data[attributes][price]",              b.price || "0.00");
    fd.append("data[attributes][isBestSelling]",      formData.tags?.includes("isBestSelling") ? 1 : 0);
    fd.append("data[attributes][isFeatured]",         formData.tags?.includes("isFeatured")    ? 1 : 0);
    fd.append("data[attributes][isNewArrival]",       formData.tags?.includes("isNewArrival")  ? 1 : 0);
    fd.append("data[attributes][isNew]",              formData.tags?.includes("isNew")         ? 1 : 0);
    fd.append("data[attributes][hasDiscount]",        b.hasDiscount ? 1 : 0);
    fd.append("data[attributes][discountPercentage]", Number(b.discountPercentage || 0));

    if (b.newArrivalImage instanceof File) {
      fd.append("data[attributes][newArrivalImage]", b.newArrivalImage);
    }

    // ── Relationships ────────────────────────────
    fd.append(
      "data[relationships][category][data][id]",
      Number(formData.subcategoryId || formData.categoryId)
    );

    // ── Images ──────────────────────────────────
    const newFiles = (formData.images || []).filter((f) => f instanceof File);
newFiles.forEach((file, index) => {
  fd.append(`data[included][images][${index}][attributes][image]`,     file);
  fd.append(`data[included][images][${index}][attributes][isPrimary]`, index === 0 ? 1 : 0);
});

    // ── Variants ─────────────────────────────────
    // FIX: was formData.variants — lives in formData.included.variants
    const validVariants = variants.filter((v) => v?.stock !== "");
    validVariants.forEach((v, i) => {
      const hasColor = v.color?.startsWith("#") && v.color.length === 7;
      const hasSize  = v.size?.trim();

      fd.append(`data[included][variants][${i}][attributes][stock]`, Number(v.stock || 0));

      if (hasColor) {
        fd.append(`data[included][variants][${i}][included][color][attributes][name]`,    v.colorName || v.color);
        fd.append(`data[included][variants][${i}][included][color][attributes][hexCode]`, v.color);
      }

      if (hasSize) {
        fd.append(`data[included][variants][${i}][included][size][attributes][name]`,       v.size);
        fd.append(`data[included][variants][${i}][included][size][attributes][sizeLabel]`,  v.size);
        fd.append(`data[included][variants][${i}][included][size][attributes][extraPrice]`, v.extraPrice ? Number(v.extraPrice) : 0);
      }
    });

    // derive hasColor / hasSize from variants
    fd.append("data[attributes][hasColor]", validVariants.some((v) => v.color?.startsWith("#")) ? 1 : 0);
    fd.append("data[attributes][hasSize]",  validVariants.some((v) => v.size?.trim()) ? 1 : 0);

    if (isEditMode) {
      await editProduct(id, fd);
    } else {
      await addProduct(fd);
    }

    setIsOpen(false);
    onSuccess?.();
  } catch (err) {
    console.error("❌ ERROR:", err.response?.data || err);
  }
};


const addVariant = () => {
  setFormData((prev) => ({
    ...prev,
    included: {
      ...prev.included,
      variants: [
        ...(prev.included.variants || []),
        { color: "", colorName: "", size: "", stock: "", extraPrice: "" },
      ],
    },
  }));
};

const removeVariant = (index) => {
  setFormData((prev) => ({
    ...prev,
    included: {
      ...prev.included,
      variants: prev.included.variants.filter((_, i) => i !== index),
    },
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

<div className="space-y-2">
  <h3 className="font-semibold">Images</h3>

  {/* Existing images from server */}
  {formData.existingImages?.map((img, index) => (
    <div key={`existing-${img.id}`} className="flex items-center gap-2">
      <img src={img.url} className="w-10 h-10 rounded object-cover border" 
      crossOrigin="anonymous"/>
      <span className="text-xs flex-1 truncate text-gray-500">{img.url.split("/").pop()}</span>
      <span className="text-xs w-20">{img.isPrimary ? "Primary" : `Photo ${index + 1}`}</span>
      <button
        type="button"
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            existingImages: prev.existingImages.filter((i) => i.id !== img.id),
          }))
        }
        className="text-red-500 text-lg"
      >
        ×
      </button>
    </div>
  ))}

  {/* New file uploads */}
  {(formData.images?.length ? formData.images : [null]).map((file, index) => (
  <div key={`new-${index}`} className="flex items-center gap-2">
    
    {/* Add preview for selected file */}
    {file ? (
      <img
        src={URL.createObjectURL(file)}
        className="w-10 h-10 rounded object-cover border"
      />
    ) : (
      <div className="w-10 h-10 rounded border bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
        ?
      </div>
    )}

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
      {!formData.existingImages?.length && index === 0 ? "Primary" : `Photo ${index + 1}`}
    </span>
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

  {((formData.existingImages?.length || 0) + (formData.images?.length || 1)) < 4 && (
    <button
      type="button"
      onClick={() =>
        setFormData((prev) => ({
          ...prev,
          images: [...(prev.images || []), null],
        }))
      }
      className="text-sm text-[rgb(var(--color-primary-main))]"
    >
      + Add photo
    </button>
  )}
</div>

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
    {(formData.included.variants?.length
      ? formData.included.variants
      : [{ color: "", size: "", stock: "", extraPrice: "" }]
    ).map((v, index) => {

      // helper to avoid repeating the same spread every time
      const updateVariant = (field, value) => {
        setFormData((prev) => {
          const updated = [...prev.included.variants];
          updated[index] = { ...updated[index], [field]: value };
          return { ...prev, included: { ...prev.included, variants: updated } };
        });
      };

      return (
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
                onChange={(e) => updateVariant("color", e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
            <Input
              placeholder="#000000"
              value={v.color}
              onChange={(e) => updateVariant("color", e.target.value)}
            />
          </div>

          {/* SIZE */}
          <Input
            placeholder="Size"
            value={v.size}
            onChange={(e) => updateVariant("size", e.target.value)}
          />

          {/* STOCK */}
          <Input
            placeholder="Stock *"
            type="number"
            value={v.stock}
            onChange={(e) => updateVariant("stock", e.target.value)}
          />

          {/* EXTRA PRICE + DELETE */}
          <div className="flex gap-2">
            <Input
              placeholder="Extra price"
              type="number"
              value={v.extraPrice}
              onChange={(e) => updateVariant("extraPrice", e.target.value)}
            />
            {(formData.included.variants?.length || 1) > 1 && (
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
      );
    })}
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