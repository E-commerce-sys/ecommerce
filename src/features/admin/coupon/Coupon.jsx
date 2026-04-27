import { useEffect, useState } from "react";
import {
  useLoaderData,
  useRevalidator,
  useSearchParams,
} from "react-router-dom";
import Button from "@/components/Button";
import GivenCouponsTable from "./GivenCouponsTable";
import { createCoupone } from "./api/createCoupone";
import { fetchAdminUsersForSelect } from "../users/api/getUsers";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { AdminPagination } from "../utils/AdminPagination.jsx";

const emptyForm = () => ({
  userId: "",
  couponCode: "",
  discountPercentage: "",
  expireDate: "",
  maxApplicablePrice: "",
});

/** HTML date input (yyyy-mm-dd) → API e.g. "3 October 2026" */
function formatExpiresAtForApi(htmlDateValue) {
  if (!htmlDateValue) return "";
  const [y, m, d] = htmlDateValue.split("-").map(Number);
  if (!y || !m || !d) return "";
  const date = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function Coupon() {
  const loaderData = useLoaderData();
  const revalidator = useRevalidator();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");

  const coupons = loaderData?.data ?? [];
  const meta = loaderData?.meta ?? {};
  const currentPage = Number(meta.current_page ?? 1);
  const lastPage = Number(meta.last_page ?? 1);
  const hasItems = coupons.length > 0;

  function resetForm() {
    setForm(emptyForm());
    setErrors({});
    setSubmitting(false);
    setSubmitError("");
  }

  useEffect(() => {
    if (!open) return undefined;

    let cancelled = false;

    (async () => {
      setUsersLoading(true);
      setUsersError("");
      try {
        let page = 1;
        let lastPage = 1;
        const acc = [];
        do {
          const data = await fetchAdminUsersForSelect({ page: String(page) });
          if (cancelled) return;
          acc.push(...(data?.data ?? []));
          lastPage = Number(data?.meta?.last_page ?? 1);
          page += 1;
        } while (page <= lastPage);

        if (!cancelled) setUsers(acc);
      } catch {
        if (!cancelled) setUsersError("Could not load users.");
      } finally {
        if (!cancelled) setUsersLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open]);

  const handleOpenChange = (next) => {
    setOpen(next);
    if (!next) resetForm();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "couponCode" ? value.toUpperCase().replace(/\s+/g, "") : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validate(values) {
    const nextErrors = {};

    const code = values.couponCode.trim();
    const discount = Number(values.discountPercentage);
    const maxPrice =
      values.maxApplicablePrice === ""
        ? null
        : Number(values.maxApplicablePrice);

    if (!values.userId) nextErrors.userId = "Please select a user.";

    if (!code) nextErrors.couponCode = "Coupon code is required.";
    else if (code.length < 3) {
      nextErrors.couponCode = "Coupon code should be at least 3 characters.";
    }

    if (values.discountPercentage === "") {
      nextErrors.discountPercentage = "Discount percentage is required.";
    } else if (Number.isNaN(discount) || discount <= 0) {
      nextErrors.discountPercentage = "Discount must be greater than 0.";
    } else if (discount > 100) {
      nextErrors.discountPercentage = "Discount cannot be more than 100%.";
    }

    if (!values.expireDate) {
      nextErrors.expireDate = "Expire date is required.";
    }

    if (values.maxApplicablePrice === "") {
      nextErrors.maxApplicablePrice = "Max applicable price is required.";
    } else if (maxPrice != null && (Number.isNaN(maxPrice) || maxPrice < 0)) {
      nextErrors.maxApplicablePrice =
        "Max applicable price must be 0 or greater.";
    }

    return nextErrors;
  }

  function buildPayload(values) {
    const expiresAt = formatExpiresAtForApi(values.expireDate);
    return {
      data: {
        attributes: {
          code: values.couponCode.trim().toUpperCase(),
          discountPercentage: Number(values.discountPercentage),
          expiresAt,
          maxApplicablePrice: Number(values.maxApplicablePrice),
        },
        relationships: {
          user: {
            data: {
              id: Number(values.userId),
            },
          },
        },
      },
    };
  }

  async function handleSubmit() {
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const payload = buildPayload(form);
      await createCoupone(payload);
      setOpen(false);
      resetForm();
      revalidator.revalidate();
    } catch (error) {
      const msg =
        error?.response?.data?.errors?.[0]?.message ??
        error?.response?.data?.message ??
        error?.message ??
        "Could not create coupon.";
      setSubmitError(String(msg));
      console.error("Failed to create coupon:", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold">Coupons</p>
          <p className="text-sm text-gray-500">Give users special discounts</p>
        </div>

        <AlertDialog open={open} onOpenChange={handleOpenChange}>
          <AlertDialogTrigger asChild>
            <Button size="sm" type="button" onClick={handleOpen}>
              Give coupon
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent
            size="default"
            overlayClassName="bg-black/35"
            className="max-w-md border border-[rgb(var(--color-border))] bg-white shadow-xl sm:max-w-2xl"
          >
            <AlertDialogHeader className="gap-2 text-left">
              <AlertDialogTitle className="text-xl">
                Give Coupon
              </AlertDialogTitle>
              <AlertDialogDescription>
                Fill coupon details and assign it to a user.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium">User</label>
                <Select
                  value={form.userId || undefined}
                  onValueChange={(value) => {
                    setForm((prev) => ({ ...prev, userId: value }));
                    if (errors.userId) {
                      setErrors((prev) => ({ ...prev, userId: "" }));
                    }
                  }}
                  disabled={usersLoading || !!usersError}
                >
                  <SelectTrigger
                    size="default"
                    className="h-10 w-full max-w-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-none focus:ring-1 focus:ring-[rgb(var(--color-primary-main))]"
                  >
                    <SelectValue
                      placeholder={
                        usersLoading
                          ? "Loading users…"
                          : usersError
                            ? "Failed to load users"
                            : "Select a user"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Users</SelectLabel>
                      {users.map((u) => {
                        const a = u.attributes ?? {};
                        const label = [a.firstName, a.lastName]
                          .filter(Boolean)
                          .join(" ")
                          .trim();
                        const email = a.email ?? "";
                        return (
                          <SelectItem key={u.id} value={String(u.id)}>
                            {label
                              ? `${label} (${email})`
                              : email || `User #${u.id}`}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {usersError ? (
                  <p className="text-xs text-red-600">{usersError}</p>
                ) : null}
                {errors.userId ? (
                  <p className="text-xs text-red-600">{errors.userId}</p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="coupon-code" className="text-sm font-medium">
                  Coupon Code
                </label>
                <input
                  id="coupon-code"
                  name="couponCode"
                  type="text"
                  value={form.couponCode}
                  onChange={handleChange}
                  placeholder="SAVE20"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm uppercase outline-none focus:ring-1 focus:ring-[rgb(var(--color-primary-main))]"
                />
                {errors.couponCode ? (
                  <p className="text-xs text-red-600">{errors.couponCode}</p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="coupon-discount"
                  className="text-sm font-medium"
                >
                  Discount Percentage (%)
                </label>
                <input
                  id="coupon-discount"
                  name="discountPercentage"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={form.discountPercentage}
                  onChange={handleChange}
                  placeholder="20"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[rgb(var(--color-primary-main))]"
                />
                {errors.discountPercentage ? (
                  <p className="text-xs text-red-600">
                    {errors.discountPercentage}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="coupon-expire-date"
                  className="text-sm font-medium"
                >
                  Expire Date
                </label>
                <input
                  id="coupon-expire-date"
                  name="expireDate"
                  type="date"
                  value={form.expireDate}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[rgb(var(--color-primary-main))]"
                />
                {errors.expireDate ? (
                  <p className="text-xs text-red-600">{errors.expireDate}</p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="coupon-max-price"
                  className="text-sm font-medium"
                >
                  Max Applicable Price
                </label>
                <input
                  id="coupon-max-price"
                  name="maxApplicablePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.maxApplicablePrice}
                  onChange={handleChange}
                  placeholder="1000"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[rgb(var(--color-primary-main))]"
                />
                <p className="text-xs text-gray-500">
                  Maximum order total to use this coupon
                </p>
                {errors.maxApplicablePrice ? (
                  <p className="text-xs text-red-600">
                    {errors.maxApplicablePrice}
                  </p>
                ) : null}
              </div>
            </div>

            {submitError ? (
              <p className="text-sm text-red-600">{submitError}</p>
            ) : null}

            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>

              <button
                type="button"
                disabled={submitting}
                onClick={() => void handleSubmit()}
                className="min-w-28 rounded-2xl bg-black px-5 py-1 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {submitting ? "Saving..." : "Give Coupon"}
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="w-full">
        <GivenCouponsTable coupons={coupons} />
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

export default Coupon;
