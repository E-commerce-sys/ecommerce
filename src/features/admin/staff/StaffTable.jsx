import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function StaffTable({staff,handleEdit,handleDelete}){
    return(
        <Table>
            <TableCaption>A list of our staff</TableCaption>
            <TableHeader>
                <TableRow className="bg-gray-100">
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
            </TableHeader>
            <TableBody>
  {staff.map((s) => (
  <TableRow key={s.id}>
    <TableCell>
      <span>{s.attributes.firstName}</span> <span>{s.attributes.lastName}</span>
    </TableCell>
    <TableCell>{s.attributes.email}</TableCell>
    <TableCell>
      {/* phoneNo doesn't exist in the API response — remove or replace with a valid field */}
      {s.attributes.isVerified ? "Verified" : "Unverified"}
    </TableCell>
    <TableCell>
      <button
        className="border border-gray-300 w-15 h-8 rounded-sm hover:bg-gray-200 cursor-pointer"
        onClick={() => handleEdit(s)}
      >
        Edit
      </button>
      <button
        className="border border-red-600 bg-red-100 w-15 h-8 rounded-sm hover:bg-red-200 cursor-pointer"
        onClick={() => handleDelete(s)}
      >
        Delete
      </button>
    </TableCell>
  </TableRow>
))}
</TableBody>
        </Table>)
}

export default StaffTable