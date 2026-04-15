import TableDemo from "./TableDemo";

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
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-semibold">Users</p>
        <p className="text-sm text-gray-500">Manage users here</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring outline-none focus:ring-[rgb(var(--color-primary-main))]"
          />
        </div>{" "}
        <div className="w-full">
          <TableDemo />
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
