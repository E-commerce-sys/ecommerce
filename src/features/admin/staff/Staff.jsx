import StaffTable from "./StaffTable";
import StaffModal from "./StaffModal";
import { useState, useEffect } from "react";
import { getStaffList } from "./staffAPI";
import ProductPagination from "../products/ProductPagination";
import { Input } from "@/components/ui/input";
import Button from "@/components/Button";

function Staff() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("add"); // add | edit | delete
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const emptyForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [staffList, setStaffList] = useState([]); // ← default to empty array, not undefined
  const [loading, setLoading] = useState(true);

  const [refresh, setRefresh] = useState(0);

  // update useEffect to depend on refresh
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const staff = await getStaffList(search);
        setStaffList(staff.data);
        setMeta(staff.meta);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [search, page, refresh]); // ← add refresh

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleAddClick = () => {
    setSelectedStaff(null);
    setMode("add");
    setIsOpen(true);
  };

  const handleEditClick = (staff) => {
    setSelectedStaff(staff);
    setMode("edit");
    setIsOpen(true);
  };

  const handleDeleteClick = (staff) => {
    setSelectedStaff(staff);
    setMode("delete");
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-10">
      {/* Header */}
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold">Staff</p>
          <p className="text-sm text-gray-500">Manage staff here</p>
        </div>
        <Button onClick={handleAddClick} size="sm" type="button">
          Add +{" "}
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <input
            placeholder="Search staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-300 px-3 py-1.75 outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))]"
          />
        </div>
        <StaffTable
          staff={staffList} // ✅ FIXED
          handleEdit={handleEditClick}
          handleDelete={handleDeleteClick} // ✅ now opens modal
        />
      </div>
      {/* ✅ Modal is now connected */}
      <StaffModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode={mode}
        initialData={selectedStaff}
        onSuccess={() => setRefresh((prev) => prev + 1)} // ← replaces onSubmit/onDelete
      />

      <ProductPagination meta={meta} onPageChange={handlePageChange} />
    </div>
  );
}

export default Staff;
