import Button from "@/components/Button";
import GivenCouponsTable from "./GivenCouponsTable";

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
import { useState } from "react";

const emptyForm = () => ({
  userEmail: "",
  couponCode: "",
  discountValue: "",
  discountType: "percent",
  expireDate: "",
  minOrder: "",
});

function Coupon() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function resetForm() {
    setForm(emptyForm());
    setErrors({});
    setSubmitting(false);
  }

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

    const email = values.userEmail.trim();
    const code = values.couponCode.trim();
    const discount = Number(values.discountValue);
    const minOrder = values.minOrder === "" ? null : Number(values.minOrder);

    if (!email) nextErrors.userEmail = "User email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.userEmail = "Enter a valid email address.";
    }

    if (!code) nextErrors.couponCode = "Coupon code is required.";
    else if (code.length < 3) {
      nextErrors.couponCode = "Coupon code should be at least 3 characters.";
    }

    if (values.discountValue === "") {
      nextErrors.discountValue = "Discount value is required.";
    } else if (Number.isNaN(discount) || discount <= 0) {
      nextErrors.discountValue = "Discount value must be greater than 0.";
    } else if (values.discountType === "percent" && discount > 100) {
      nextErrors.discountValue = "Percent discount cannot be more than 100.";
    }

    if (!values.expireDate) {
      nextErrors.expireDate = "Expire date is required.";
    }

    if (minOrder != null && (Number.isNaN(minOrder) || minOrder < 0)) {
      nextErrors.minOrder = "Min order must be 0 or greater.";
    }

    return nextErrors;
  }

  function buildPayload(values) {
    return {
      data: {
        attributes: {
          userEmail: values.userEmail.trim(),
          couponCode: values.couponCode.trim().toUpperCase(),
          discountValue: Number(values.discountValue),
          discountType: values.discountType,
          expireDate: values.expireDate,
          minOrder: values.minOrder === "" ? null : Number(values.minOrder),
        },
      },
    };
  }

  async function handleSubmit() {
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const payload = buildPayload(form);
      // TODO: Replace with API call later (e.g., await createCoupon(payload))
      console.log("Coupon payload ready for API:", payload);
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error("Failed to prepare coupon:", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold">Coupon</p>
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
                <label
                  htmlFor="coupon-user-email"
                  className="text-sm font-medium"
                >
                  User Email
                </label>
                <input
                  id="coupon-user-email"
                  name="userEmail"
                  type="email"
                  value={form.userEmail}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-main))]"
                />
                {errors.userEmail ? (
                  <p className="text-xs text-red-600">{errors.userEmail}</p>
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
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm uppercase outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-main))]"
                />
                {errors.couponCode ? (
                  <p className="text-xs text-red-600">{errors.couponCode}</p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Discount</label>
                <div className="flex gap-2">
                  <input
                    name="discountValue"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.discountValue}
                    onChange={handleChange}
                    placeholder="20"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-main))]"
                  />

                  <select
                    name="discountType"
                    value={form.discountType}
                    onChange={handleChange}
                    className="rounded-md border border-gray-300 px-2 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-main))]"
                  >
                    <option value="percent">%</option>
                    <option value="fixed">$</option>
                  </select>
                </div>
                {errors.discountValue ? (
                  <p className="text-xs text-red-600">{errors.discountValue}</p>
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
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-main))]"
                />
                {errors.expireDate ? (
                  <p className="text-xs text-red-600">{errors.expireDate}</p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="coupon-min-order"
                  className="text-sm font-medium"
                >
                  Min Order (optional)
                </label>
                <input
                  id="coupon-min-order"
                  name="minOrder"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.minOrder}
                  onChange={handleChange}
                  placeholder="100"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-main))]"
                />
                {errors.minOrder ? (
                  <p className="text-xs text-red-600">{errors.minOrder}</p>
                ) : null}
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>

              <button
                type="button"
                disabled={submitting}
                onClick={() => void handleSubmit()}
                className="min-w-28 rounded-2xl bg-black px-5 py-1 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {submitting ? "Preparing..." : "Give Coupon"}
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="w-full">
        <GivenCouponsTable />
      </div>
    </div>
  );
}

export default Coupon;
