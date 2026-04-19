import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export default function ProductPagination({ meta, onPageChange }) {
  if (!meta?.links?.length) return null;

  return (
    <Pagination className="mt-6">
  <PaginationContent>
    {meta.links.map((link, index) => {
      const isPrev = link.label.includes("Previous");
      const isNext = link.label.includes("Next");
      const isEllipsis = link.label === "...";

      if (isPrev) {
        return (
          <PaginationItem key={index}>
            <PaginationPrevious
              onClick={() => link.url && onPageChange(link.page)}
              className={!link.url ? "pointer-events-none opacity-40" : "cursor-pointer"}
            />
          </PaginationItem>
        );
      }

      if (isNext) {
        return (
          <PaginationItem key={index}>
            <PaginationNext
              onClick={() => link.url && onPageChange(link.page)}
              className={!link.url ? "pointer-events-none opacity-40" : "cursor-pointer"}
            />
          </PaginationItem>
        );
      }

      if (isEllipsis) {
        return (
          <PaginationItem key={index}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      return (
        <PaginationItem key={index}>
          <PaginationLink
            isActive={link.active}
            onClick={() => onPageChange(link.page)}
            className="cursor-pointer"
          >
            {link.label}
          </PaginationLink>
        </PaginationItem>
      );
    })}
  </PaginationContent>
</Pagination>
  );
}