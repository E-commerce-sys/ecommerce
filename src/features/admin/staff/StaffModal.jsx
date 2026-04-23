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

function StaffModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit,
  onDelete,
}) {
  const isDelete = mode === "delete";
  const isEdit = mode === "edit";

  const emptyForm = { fName: "", lName: "", email: "", phoneNo: "" };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isOpen) {
      setForm(initialData ?? emptyForm);
    }
  }, [isOpen,mode]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log(form)
    if (!form.fName || !form.email) return;
    onSubmit({ ...form, phoneNo: Number(form.phoneNo) });
    onClose();
  };

  const handleDelete = () => {
    onDelete(initialData?.id);
    onClose();
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
                  {form.fName} {form.lName}
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
              <Input name="fName" placeholder="First Name" value={form.fName || ""} onChange={handleChange} />
              <Input name="lName" placeholder="Last Name" value={form.lName || ""} onChange={handleChange} />
              <Input name="email" placeholder="Email" value={form.email || ""} onChange={handleChange} />
              <Input name="phoneNo" placeholder="Phone" value={form.phoneNo || ""} onChange={handleChange} />
            </div>
            <AlertDialogFooter>
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