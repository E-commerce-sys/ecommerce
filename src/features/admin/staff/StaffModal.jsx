import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
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
import { updateUser } from "../users/api/updateUser";
import { deleteUser } from "../users/api/deleteUser"
import { addStaff } from "./staffAPI";

function StaffModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSuccess,  // ✅ fixed
}) {
  const isDelete = mode === "delete";
  const isEdit = mode === "edit";

  const emptyForm = { firstName: "", lastName: "", email: "" };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isOpen) {
      setForm({
        firstName: initialData?.attributes?.firstName ?? "",
        lastName: initialData?.attributes?.lastName ?? "",
        email: initialData?.attributes?.email ?? "",
      });
    }
  }, [isOpen, mode]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
  if (!form.firstName || !form.email) return;
  try {
    if (isEdit) {
      const original = {
        firstName: initialData?.attributes?.firstName,
        lastName: initialData?.attributes?.lastName,
        email: initialData?.attributes?.email,
      };

      const changedAttributes = Object.fromEntries(
        Object.entries(form).filter(([key, val]) => val !== original[key])
      );

      if (Object.keys(changedAttributes).length === 0) {
        onClose();
        return;
      }

      await updateUser(initialData.id, {
        data: {
          type: "user",
          id: initialData.id,
          attributes: changedAttributes,
        }
      });
    } else {
      await addStaff({
        data: {
          attributes: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password,
            password_confirmation: form.password_confirmation,
          }
        }
      });
    }

    onSuccess?.();
    onClose();
  } catch (err) {
    console.error(err);
  }
};

  const handleDelete = async () => {
  try {
    await deleteUser(initialData.id)
    onSuccess?.()
    onClose()
  } catch (err) {
    console.error(err)
  }
};

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-md">
        {isDelete ? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-600">Remove Staff</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove{" "}
                <span className="font-semibold text-foreground">
                  {form.firstName} {form.lastName}
                </span>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        ) : (
          <>
  <AlertDialogHeader>
    <AlertDialogTitle>
      {isEdit ? "Edit Staff" : "Add Staff"}
    </AlertDialogTitle>
  </AlertDialogHeader>
  <div className="flex flex-col gap-3">
    <Input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
    <Input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
    <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
    {!isEdit && (
      <>
        <Input name="password" type="password" placeholder="Password" value={form.password || ""} onChange={handleChange} />
        <Input name="password_confirmation" type="password" placeholder="Confirm Password" value={form.password_confirmation || ""} onChange={handleChange} />
      </>
    )}
  </div>
  <AlertDialogFooter className="gap-2">
    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
    <AlertDialogAction onClick={handleSubmit}>
      {isEdit ? "Save Changes" : "Add Staff"}
    </AlertDialogAction>
  </AlertDialogFooter>
</>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default StaffModal;