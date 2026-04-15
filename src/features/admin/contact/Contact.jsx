import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const messages = [
  {
    id: 1,
    name: "Ali",
    email: "ali@example.com",
    message:
      "I wanted to take some time to share detailed feedback about my experience using your e-commerce website. Overall, I appreciate the effort that has clearly gone into building the platform, and there are several aspects that stand out positively, as well as some areas where improvements could significantly enhance the user experience.",
  },
  {
    id: 2,
    name: "Ahmed",
    email: "ahmed@example.com",
    message:
      "First, the overall design of the website is clean and visually appealing. The layout feels modern, and the use of colors, spacing, and typography creates a pleasant browsing experience. Navigation is generally intuitive, and I was able to move between categories and pages without confusion. This is especially important for first-time users, and your platform does a good job of making things accessible. The product pages are also well-structured. I found the images to be clear and of good quality, and the descriptions provided useful information about the items. However, in some cases, I felt that additional details—such as sizing guides, material information, or more customer reviews—would help users make more confident purchasing decisions. Expanding these sections could improve trust and reduce hesitation before checkout.",
  },
  {
    id: 3,
    name: "Sara",
    email: "sara@gmail.com",
    message:
      "One area that I believe could be improved is the search functionality. While it generally works, I found that it sometimes struggles to return relevant results, especially when using more specific or less common search terms. Implementing more advanced search algorithms or adding filters could help users find what they are looking for more efficiently. Additionally, the checkout process, while straightforward, could benefit from some enhancements. For instance, offering more payment options and providing clearer feedback during each step of the checkout would help reduce any potential confusion. It would also be helpful to have a progress indicator during checkout so users know how many steps are left before completing their purchase.",
  },
];

function Contact() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-semibold">Contacts</p>
        <p className="text-sm text-gray-500">See users messages here</p>
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>{""}</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {messages.map((message, index) => (
              <React.Fragment key={index}>
                {/* 🔹 MAIN ROW */}
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell className="whitespace-normal break-words max-w-lg">
                    {" "}
                    {message.message}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
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

export default Contact;
