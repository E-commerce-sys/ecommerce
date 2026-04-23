import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/** Display as dd/mm/yy (not US mm/dd/yy). */
function formatDate(iso) {
  if (!iso) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const yy = String(date.getFullYear()).slice(-2);
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${yy}`;
}

function GivenCouponsTable({ coupons = [] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>#</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead className="text-center">User Email</TableHead>
          <TableHead className="text-center">Coupon Code</TableHead>
          <TableHead className="text-center">Discount (%)</TableHead>
          <TableHead className="text-center">Max Price</TableHead>
          <TableHead className="text-center">Expire Date</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {coupons.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center text-gray-500 py-8">
              No coupons found
            </TableCell>
          </TableRow>
        ) : (
          coupons.map((coupon, index) => {
            const user = coupon.included?.user?.attributes;
            const attrs = coupon.attributes;
            const isActive = attrs?.isActive ?? false;
            const isExpired = attrs?.expiresAt
              ? new Date(attrs.expiresAt) < new Date()
              : false;

            return (
              <React.Fragment key={coupon.id || index}>
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {user
                      ? `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                        "-"
                      : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {user?.email || "-"}
                  </TableCell>
                  <TableCell className="text-center font-mono font-semibold">
                    {attrs?.code || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {attrs?.discountPercentage
                      ? `${attrs.discountPercentage}%`
                      : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {attrs?.maxApplicablePrice
                      ? `$${Number(attrs.maxApplicablePrice).toFixed(2)}`
                      : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(attrs?.expiresAt)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium ${
                        isExpired
                          ? "bg-gray-200 text-gray-700"
                          : isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {isExpired ? "Expired" : isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}

export default GivenCouponsTable;
