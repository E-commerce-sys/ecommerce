import { useState } from "react";
import TableDemo from "./TableDemo";
import { useLoaderData, useSearchParams } from "react-router-dom";

import { AdminPagination } from "../utils/AdminPagination.jsx";

function User() {
  const loaderData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );

  const users = loaderData?.data ?? [];
  const meta = loaderData?.meta ?? {};
  const currentPage = Number(meta.current_page ?? 1);
  const lastPage = Number(meta.last_page ?? 1);
  const hasItems = users.length > 0;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      next.set("search", searchInput.trim());
    } else {
      next.delete("search");
    }
    next.set("page", "1");
    setSearchParams(next);
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-semibold">Users</p>
        <p className="text-sm text-gray-500">Manage users here</p>
      </div>
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-full border border-gray-300 px-3 py-1.75 outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))]"
          />
        </form>
        <div className="w-full">
          <TableDemo users={loaderData} />
        </div>
      </div>

      {hasItems ? (
        <AdminPagination
          currentPage={currentPage}
          lastPage={lastPage}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      ) : null}
    </div>
  );
}

export default User;
