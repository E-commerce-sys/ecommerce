import { useCallback, useMemo, useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";

import Button from "../../../components/Button";
import TableDemo from "./TableDemo";
import { createCategory } from "./api/createCategory";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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

const NO_PARENT = "__none__";

const emptyForm = () => ({
  nameEn: "",
  nameKu: "",
  nameAr: "",
  parentId: "",
  icon: null,
});

function Categories() {
  const data = useLoaderData();
  const revalidator = useRevalidator();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const parents = useMemo(() => data?.data ?? [], [data]);

  const resetForm = useCallback(() => {
    setForm(emptyForm());
    setSubmitError("");
  }, []);

  const handleOpenChange = (next) => {
    setOpen(next);
    if (!next) resetForm();
  };

  const handleOpen = () => {
    resetForm();
    setOpen(true);
  };

  const handleSubmit = async () => {
    setSubmitError("");
    if (!form.nameEn.trim() || !form.nameKu.trim() || !form.nameAr.trim()) {
      setSubmitError("Please fill in all name fields.");
      return;
    }

    const fd = new FormData();
    fd.append("data[attributes][nameEn]", form.nameEn.trim());
    fd.append("data[attributes][nameKu]", form.nameKu.trim());
    fd.append("data[attributes][nameAr]", form.nameAr.trim());

    if (form.icon instanceof File) {
      fd.append("data[attributes][icon]", form.icon, form.icon.name);
    }

    if (form.parentId) {
      fd.append("data[relationships][parent][data][id]", String(form.parentId));
    }

    setSubmitting(true);
    try {
      await createCategory(fd);
      revalidator.revalidate();
      setOpen(false);
      resetForm();
    } catch (err) {
      const msg =
        err?.response?.data?.errors?.[0]?.message ||
        err?.response?.data?.message ||
        err?.message ||
        "Could not create category.";
      setSubmitError(String(msg));
    } finally {
      setSubmitting(false);
    }
  };

  const selectValue = form.parentId ? String(form.parentId) : NO_PARENT;

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold">Categories</p>
          <p className="text-sm text-gray-500">
            Manage your product categories here
          </p>
        </div>

        <AlertDialog open={open} onOpenChange={handleOpenChange}>
          <AlertDialogTrigger asChild>
            <Button size="sm" type="button" onClick={handleOpen}>
              Add +
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent
            size="default"
            overlayClassName="bg-black/35"
            className="max-w-md sm:max-w-lg"
          >
            <AlertDialogHeader className="text-left sm:text-left">
              <AlertDialogTitle>Add category</AlertDialogTitle>
              <AlertDialogDescription>
                Names in English, Kurdish, and Arabic. <br></br> Choose a parent
                — to make this a subcategory — and upload an icon image .
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <label htmlFor="cat-name-en" className="text-sm font-medium">
                  English name
                </label>
                <input
                  id="cat-name-en"
                  value={form.nameEn}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, nameEn: e.target.value }))
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-main))]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="cat-name-ku" className="text-sm font-medium">
                  Kurdish name
                </label>
                <input
                  id="cat-name-ku"
                  value={form.nameKu}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, nameKu: e.target.value }))
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-main))]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="cat-name-ar" className="text-sm font-medium">
                  Arabic name
                </label>
                <input
                  id="cat-name-ar"
                  value={form.nameAr}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, nameAr: e.target.value }))
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-main))]"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-sm font-medium">Parent category</span>
                <p className="text-xs text-muted-foreground">
                  by default, this category will be a parent category.
                </p>
                <Select
                  value={selectValue}
                  onValueChange={(value) =>
                    setForm((f) => ({
                      ...f,
                      parentId: value === NO_PARENT ? "" : value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select parent (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Parent</SelectLabel>
                      <SelectItem value={NO_PARENT}>
                        None (top-level)
                      </SelectItem>
                      {parents.map((cat) => (
                        <SelectItem key={cat.id} value={String(cat.id)}>
                          {cat.attributes?.nameEn ?? `Category #${cat.id}`}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="cat-icon" className="text-sm font-medium">
                  Icon (image)
                </label>
                <input
                  id="cat-icon"
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

              {submitError ? (
                <p className="text-sm text-red-600">{submitError}</p>
              ) : null}
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel type="button" disabled={submitting}>
                Cancel
              </AlertDialogCancel>
              <button
                size="sm"
                type="button"
                disabled={submitting}
                onClick={() => void handleSubmit()}
                className="px-5 bg-black rounded-2xl text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                Add
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="w-full">
        <TableDemo categories={data.data} />
      </div>
    </div>
  );
}

export default Categories;
