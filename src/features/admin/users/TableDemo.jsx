import React, { useState } from "react";
import { useRevalidator } from "react-router-dom";
import Button from "@/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { updateUser } from "./api/updateUser";
import { deleteUser } from "./api/deleteUser";
import { blockUser } from "./api/blockUser";
import { unblockUser } from "./api/unblockUser";

export function TableDemo({ users }) {
  const data = users?.data ?? [];
  const { revalidate } = useRevalidator();

  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [originalForm, setOriginalForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [blockingUserId, setBlockingUserId] = useState(null);

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    const formData = {
      firstName: user.attributes.firstName || "",
      lastName: user.attributes.lastName || "",
      email: user.attributes.email || "",
    };
    setEditForm(formData);
    setOriginalForm(formData);
    setError("");
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditForm({ firstName: "", lastName: "", email: "" });
    setOriginalForm({ firstName: "", lastName: "", email: "" });
    setError("");
  };

  const handleSaveEdit = async (userId) => {
    setError("");

    if (!editForm.firstName.trim() || !editForm.lastName.trim()) {
      setError("First name and last name are required");
      return;
    }

    if (!editForm.email.trim()) {
      setError("Email is required");
      return;
    }

    setSaving(true);
    try {
      // Build payload with only changed fields
      const changedAttributes = {};

      if (editForm.firstName.trim() !== originalForm.firstName) {
        changedAttributes.firstName = editForm.firstName.trim();
      }

      if (editForm.lastName.trim() !== originalForm.lastName) {
        changedAttributes.lastName = editForm.lastName.trim();
      }

      if (editForm.email.trim() !== originalForm.email) {
        changedAttributes.email = editForm.email.trim();
      }

      // Only send request if there are changes
      if (Object.keys(changedAttributes).length === 0) {
        setEditingUserId(null);
        setEditForm({ firstName: "", lastName: "", email: "" });
        setOriginalForm({ firstName: "", lastName: "", email: "" });
        return;
      }

      const payload = {
        data: {
          attributes: changedAttributes,
        },
      };

      await updateUser(userId, payload);
      setEditingUserId(null);
      setEditForm({ firstName: "", lastName: "", email: "" });
      setOriginalForm({ firstName: "", lastName: "", email: "" });
      revalidate();
    } catch (err) {
      console.error("Failed to update user:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update user. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    setDeleting(true);
    try {
      await deleteUser(userToDelete.id);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      revalidate();
    } catch (err) {
      console.error("Failed to delete user:", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleBlockClick = async (user) => {
    const isBlocked = user.attributes?.isBlocked || false;
    setBlockingUserId(user.id);
    try {
      if (isBlocked) {
        await unblockUser(user.id);
      } else {
        await blockUser(user.id);
      }
      revalidate();
    } catch (err) {
      console.error("Failed to block/unblock user:", err);
    } finally {
      setBlockingUserId(null);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>#</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Address</TableHead>
            <TableHead className="text-center">Orders</TableHead>
            <TableHead className="text-center">Canceled</TableHead>
            <TableHead className="text-right pr-4">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            data.map((user, index) => {
              const isEditing = editingUserId === user.id;
              const isBlocked = user.attributes?.isBlocked || false;
              const isBlockingThis = blockingUserId === user.id;
              return (
                <React.Fragment key={user.id || index}>
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.firstName}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full rounded border border-gray-300 px-2 py-1"
                        />
                      ) : (
                        user.attributes.firstName
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.lastName}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full rounded border border-gray-300 px-2 py-1"
                        />
                      ) : (
                        user.attributes.lastName
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {isEditing ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                          }
                          className="w-full rounded border border-gray-300 px-2 py-1"
                        />
                      ) : (
                        user.attributes.email
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.attributes?.address || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.attributes.numOfOrders || 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.attributes.numCancelledOrders || 0}
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <div className="flex gap-2 justify-end">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleCancelEdit()}
                              disabled={saving}
                              className="h-8 w-16 rounded-sm border border-gray-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => void handleSaveEdit(user.id)}
                              disabled={saving}
                              className="h-8 w-16 rounded-sm border border-green-600 bg-green-100 hover:bg-green-200 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {saving ? "..." : "Save"}
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditClick(user)}
                              className="h-8 w-16 rounded-sm border border-gray-300 hover:bg-gray-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => void handleBlockClick(user)}
                              disabled={isBlockingThis}
                              className={`h-8 w-18 rounded-sm border transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                isBlocked
                                  ? "border-green-600 bg-green-100 hover:bg-green-200"
                                  : "border-amber-600 bg-amber-50 hover:bg-amber-100"
                              }`}
                            >
                              {isBlockingThis
                                ? "..."
                                : isBlocked
                                  ? "Unblock"
                                  : "Block"}
                            </button>
                            <button
                              onClick={() => handleDeleteClick(user)}
                              className="h-8 w-15 rounded-sm border border-red-600 bg-red-100 hover:bg-red-200"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                  {isEditing && error && (
                    <TableRow>
                      <TableCell colSpan={8} className="py-2">
                        <p className="text-red-600 text-sm">{error}</p>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })
          )}
        </TableBody>
      </Table>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent overlayClassName="bg-black/40">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>
                {userToDelete?.attributes?.firstName}{" "}
                {userToDelete?.attributes?.lastName}
              </strong>
              ? This action cannot be undone.
              <br />
              <br />
              <span className="text-red-600 font-medium">
                Warning: All user's orders and data will be permanently deleted.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>

            <button
              type="button"
              onClick={() => void confirmDelete()}
              disabled={deleting}
              className="rounded-2xl bg-red-600 px-5 py-1 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete User"}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default TableDemo;
