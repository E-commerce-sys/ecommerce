import StaffTable from "./StaffTable";
import StaffModal from "./StaffModal";
import { useState, useEffect } from "react";
import { getStaffList } from "./staffAPI";
import ProductPagination from "../products/ProductPagination";
import { Input } from "@/components/ui/input";

function Staff() {

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("add"); // add | edit | delete
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("")
const emptyForm = { firstName: "", lastName: "", email: "", password: "", password_confirmation: "" };
const [selectedStaff, setSelectedStaff] = useState(null);

const [staffList, setStaffList] = useState([]) // ← default to empty array, not undefined
const [loading, setLoading] = useState(true)

const [refresh, setRefresh] = useState(0)

// update useEffect to depend on refresh
useEffect(() => {
  const fetchStaff = async () => {
    try {
      setLoading(true)
      const staff = await getStaffList(search)
      setStaffList(staff.data)
      setMeta(staff.meta);
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  fetchStaff()
}, [search, page, refresh]) // ← add refresh

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
    <div>
      <h1 className="text-3xl font-bold text-[rgb(var(--color-text-main))] mb-8">
        Staff
      </h1>

    <div className="flex justify-between">
      <Input
    placeholder="Search staff..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-72 bg-[rgb(var(--color-grey))] border border-[rgb(var(--color-primary))] text-[rgb(var(--color-text-main))] placeholder:text-[rgb(var(--color-text-main-2))] rounded-lg px-3 py-2 text-sm"
  />

      <button
        className="flex gap-1 px-4 py-2 items-center bg-[rgb(var(--color-primary-main))] hover:bg-[rgb(var(--color-primary-5))] text-white rounded transition-colors mb-4"
        onClick={handleAddClick}
      >
        <span>+</span>
        <span>Add</span>
      </button>
</div>
      <StaffTable
        staff={staffList} // ✅ FIXED
        handleEdit={handleEditClick}
        handleDelete={handleDeleteClick} // ✅ now opens modal
      />

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