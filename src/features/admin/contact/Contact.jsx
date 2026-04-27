import React from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AdminPagination } from "../utils/AdminPagination.jsx";

function Contact() {
  const loaderData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const contacts = loaderData?.data ?? [];
  const meta = loaderData?.meta ?? {};
  const currentPage = Number(meta.current_page ?? 1);
  const lastPage = Number(meta.last_page ?? 1);
  const hasItems = contacts.length > 0;

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-semibold">Contacts</p>
        <p className="text-sm text-gray-500">See user's message here</p>
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>#</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!hasItems ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-gray-500 py-8"
                >
                  No contacts found
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact, index) => (
                <React.Fragment key={contact.id || index}>
                  <TableRow>
                    <TableCell>{contact.id}</TableCell>
                    <TableCell>{contact.attributes?.name || "-"}</TableCell>
                    <TableCell>{contact.attributes?.email || "-"}</TableCell>
                    <TableCell>{contact.attributes?.phone || "-"}</TableCell>
                    <TableCell className="max-w-md whitespace-normal break-words">
                      {contact.attributes?.message || "-"}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
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

export default Contact;
