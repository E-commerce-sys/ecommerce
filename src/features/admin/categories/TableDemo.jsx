import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteCategory } from "./api/deleteCategory";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { getOneCategory } from "./api/getOneCategory";
import { updateCategory } from "./api/updateCategory";
import { useRevalidator } from "react-router-dom";

export default function TableDemo({ categories }) {
  const revalidator = useRevalidator();
  const [localCategories, setLocalCategories] = useState(categories);
  const [expanded, setExpanded] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingType, setEditingType] = useState(null); // "parent" | "child"
  const [openEdit, setOpenEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    nameEn: "",
    nameKu: "",
    nameAr: "",
    icon: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    setLocalCategories(categories ?? []);
  }, [categories]);

  const toggleRow = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setSubmitError("");

      const formData = new FormData();
      formData.append("data[attributes][nameEn]", form.nameEn.trim());
      formData.append("data[attributes][nameKu]", form.nameKu.trim());
      formData.append("data[attributes][nameAr]", form.nameAr.trim());

      if (form.icon instanceof File) {
        formData.append("data[attributes][icon]", form.icon, form.icon.name);
      }

      await updateCategory(editingId, formData);
      revalidator.revalidate();

      // setLocalCategories((prev) =>
      //   prev.map((cat) => {
      //     if (cat.id === editingId) {
      //       return {
      //         ...cat,
      //         attributes: {
      //           ...cat.attributes,
      //           nameEn: form.nameEn,
      //           nameKu: form.nameKu,
      //           nameAr: form.nameAr,
      //         },
      //       };
      //     }

      //     return {
      //       ...cat,
      //       included: {
      //         ...cat.included,
      //         children: cat.included.children.map((child) =>
      //           child.id === editingId
      //             ? {
      //                 ...child,
      //                 attributes: {
      //                   ...child.attributes,
      //                   nameEn: form.nameEn,
      //                   nameKu: form.nameKu,
      //                   nameAr: form.nameAr,
      //                 },
      //               }
      //             : child,
      //         ),
      //       },
      //     };
      //   }),
      // );

      setOpenEdit(false);
      setEditingId(null);
      setEditingType(null);
    } catch (error) {
      console.error("Error updating category:", error);
      setSubmitError("Failed to update category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditOpen = async (id, type) => {
    try {
      setEditingId(id);
      setEditingType(type);
      setSubmitError("");
      setOpenEdit(true);

      const data = await getOneCategory(id);
      const cat = data.data;
      setForm({
        nameEn: cat.attributes.nameEn || "",
        nameKu: cat.attributes.nameKu || "",
        nameAr: cat.attributes.nameAr || "",
        icon: null,
      });
    } catch (error) {
      console.error("Error fetching category for edit:", error);
      setSubmitError("Failed to load category data");
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      revalidator.revalidate();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Products</TableHead>
            <TableHead className="text-right pr-4">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {localCategories.map((cat) => (
            <React.Fragment key={cat.id}>
              {/* 🔹 Parent Row */}
              <TableRow
                key={cat.id}
                className="cursor-pointer"
                onClick={() => toggleRow(cat.id)}
              >
                <TableCell>{cat.id}</TableCell>
                <TableCell className="flex gap-3">
                  <span>{cat.attributes.nameEn}</span>
                  <span> {cat.attributes.nameKu}</span>
                  <span> {cat.attributes.nameAr}</span>
                </TableCell>
                <TableCell>{cat.attributes.NumberOfProducts}</TableCell>
                <TableCell className="flex gap-2 text-right justify-end">
                  <button
                    className="border border-gray-300 w-15 h-8 rounded-sm hover:bg-gray-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditOpen(cat.id, "parent");
                    }}
                  >
                    Edit
                  </button>
                  {/* Parent Delete */}
                  <button
                    className="border border-red-600 bg-red-100 w-15 h-8 rounded-sm hover:bg-red-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // ❗ prevent row toggle
                      setSelectedCategory({ ...cat, type: "parent" });
                      setOpenDialog(true);
                    }}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>

              {/* 🔽 Children Rows */}
              {expanded[cat.id] &&
                (cat.included?.children ?? []).map((child) => (
                  <TableRow key={child.id} className="bg-gray-50">
                    <TableCell>{child.id}</TableCell>

                    <TableCell className="pl-8 flex gap-3">
                      ↳ <span>{child.attributes.nameEn}</span>
                      <span> {child.attributes.nameKu}</span>
                      <span> {child.attributes.nameAr}</span>
                    </TableCell>
                    <TableCell>{child.attributes.NumberOfProducts}</TableCell>
                    <TableCell className="flex gap-2 justify-end">
                      <button
                        className="border border-gray-300 w-15 h-8 rounded-sm hover:bg-gray-200 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditOpen(child.id, "child");
                        }}
                      >
                        Edit
                      </button>
                      {/* Child Delete */}
                      <button
                        className="border border-red-600 bg-red-100 w-15 h-8 rounded-sm hover:bg-red-200 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategory({ ...child, type: "child" });
                          setOpenDialog(true);
                        }}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={openEdit} onOpenChange={setOpenEdit}>
        <AlertDialogContent
          size="default"
          overlayClassName="bg-black/30"
          className="max-w-md sm:max-w-lg"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>
              {editingType === "child"
                ? "Update subcategory"
                : "Update category"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {editingType === "child"
                ? "Edit the subcategory details below."
                : "Edit the category details below."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-4">
            <input
              value={form.nameEn}
              onChange={(e) =>
                setForm((f) => ({ ...f, nameEn: e.target.value }))
              }
              placeholder="English name"
              className="border p-2 rounded"
            />

            <input
              value={form.nameKu}
              onChange={(e) =>
                setForm((f) => ({ ...f, nameKu: e.target.value }))
              }
              placeholder="Kurdish name"
              className="border p-2 rounded"
            />

            <input
              value={form.nameAr}
              onChange={(e) =>
                setForm((f) => ({ ...f, nameAr: e.target.value }))
              }
              placeholder="Arabic name"
              className="border p-2 rounded"
            />

            <div className="space-y-1.5">
              <label htmlFor="cat-icon" className="text-sm font-medium">
                Icon (image)
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[rgb(var(--color-primary-1))] file:px-3 file:py-1.5 file:text-sm cursor-pointer"
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    icon: e.target.files?.[0] ?? null,
                  }))
                }
              />
            </div>

            {submitError && (
              <p className="text-red-500 text-sm">{submitError}</p>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>

            <button
              type="button"
              className="bg-black text-white px-3 py-1 rounded-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => void handleSubmit()}
              disabled={submitting}
            >
              {submitting ? "Updating..." : "Update"}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category?</AlertDialogTitle>

            <AlertDialogDescription>
              {selectedCategory?.type === "parent"
                ? "Deleting this category will permanently remove all its subcategories. This action cannot be undone."
                : "Deleting this subcategory will detach all associated products. They will remain available but without a subcategory. Are you sure you want to proceed?"}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              className="bg-red-700 text-white hover:bg-red-800"
              onClick={() => {
                handleDelete(selectedCategory.id);
                setOpenDialog(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
