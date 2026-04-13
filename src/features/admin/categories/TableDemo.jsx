import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableDemo({ categories }) {
  const [expanded, setExpanded] = useState({});

  const toggleRow = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
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
        {categories.map((cat) => (
          <>
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
                <button className="border border-gray-300 w-15 h-8 rounded-sm hover:bg-gray-200 cursor-pointer">
                  Edit
                </button>
                <button className="border border-red-600 bg-red-100  w-15 h-8  rounded-sm hover:bg-red-200 cursor-pointer ">
                  Delete
                </button>
              </TableCell>{" "}
            </TableRow>

            {/* 🔽 Children Rows */}
            {expanded[cat.id] &&
              cat.included.children.map((child) => (
                <TableRow key={child.id} className="bg-gray-50">
                  <TableCell>{child.id}</TableCell>

                  <TableCell className="pl-8 flex gap-3">
                    ↳ <span>{child.attributes.nameEn}</span>
                    <span> {child.attributes.nameKu}</span>
                    <span> {child.attributes.nameAr}</span>
                  </TableCell>
                  <TableCell>{child.attributes.NumberOfProducts}</TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <button className="border border-gray-300 w-15 h-8 rounded-sm hover:bg-gray-200 cursor-pointer">
                      Edit
                    </button>
                    <button className="border border-red-600 bg-red-100  w-15 h-8  rounded-sm hover:bg-red-200 cursor-pointer ">
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </>
        ))}
      </TableBody>
    </Table>
  );
}
