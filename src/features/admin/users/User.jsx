import { useState } from "react";
import TableDemo from "./TableDemo";
import { useLoaderData, useRevalidator } from "react-router-dom";
import Button from "@/components/Button";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function User() {
  const users = useLoaderData();
  const { revalidate } = useRevalidator();
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveSuccess = () => {
    revalidate();
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold">Users</p>
          <p className="text-sm text-gray-500">Manage users here</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search for users..."
            className="w-full rounded-full border border-gray-300 px-3 py-1.75 outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))]"
          />
        </div>
        <div className="w-full">
          <TableDemo users={users} onSaveSuccess={handleSaveSuccess} />
        </div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default User;
