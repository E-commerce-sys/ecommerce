import { useState } from "react";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";
import {
  ORDER_ERROR_ADDRESS_REQUIRED,
  useCheckoutAddress,
} from "../../context/CheckoutAddressContext";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function CartTotal() {
  const {
    cartItems,
    subtotal,
    shipping,
    shippingFormatted,
    total,
    applyCouponCode,
  } = useCart();
  const { t } = useTranslation();
  const { placeOrder, orderLoading, orderError, orderSuccess } =
    useCheckoutAddress();

  const [couponInput, setCouponInput] = useState("");
  const [couponConfirmOpen, setCouponConfirmOpen] = useState(false);
  const [couponApplying, setCouponApplying] = useState(false);
  const [couponFieldError, setCouponFieldError] = useState("");
  const [couponApplyError, setCouponApplyError] = useState("");
  const [couponApplySuccess, setCouponApplySuccess] = useState("");

  const orderErrorDisplay =
    orderError === ORDER_ERROR_ADDRESS_REQUIRED
      ? t("checkout.addressRequired")
      : orderError;

  const hasInvalidQuantity = cartItems?.some(
    (item) => item.quantity === "" || item.quantity < 1,
  );

  const isCartEmpty = cartItems.length === 0;

  function handleApplyClick() {
    setCouponApplyError("");
    setCouponApplySuccess("");
    const raw = couponInput.trim();
    if (!raw) {
      setCouponFieldError(t("checkout.couponRequired"));
      return;
    }
    setCouponFieldError("");
    setCouponConfirmOpen(true);
  }

  async function handleConfirmCoupon() {
    setCouponApplying(true);
    setCouponApplyError("");
    setCouponApplySuccess("");
    setCouponConfirmOpen(false);

    try {
      const result = await applyCouponCode(couponInput);
      if (!result.ok) {
        setCouponApplyError(result.message || t("checkout.couponApplyFailed"));
        return;
      }
      const msg = result.message ? `${result.message} ` : "";
      const totalPart = result.totalFormatted
        ? t("checkout.couponNewTotal", {
            total: `$${result.totalFormatted}`,
          })
        : "";
      setCouponApplySuccess(`${msg}${totalPart}`.trim());
    } finally {
      setCouponApplying(false);
    }
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-5 lg:w-auto lg:gap-7.5">
      <p className="text-xl font-medium lg:text-2xl">{t("cart.cartTotal")}</p>
      <div className="flex flex-col gap-8 text-base lg:gap-15 lg:text-[16px]">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <div className="flex w-full justify-between border-b border-[rgb(var(--color-text-main-2))] pb-4 lg:w-131.75">
            <p>{t("cart.sub")}</p>
            <p>${subtotal}</p>
          </div>

          <div className="flex w-full justify-between border-b border-[rgb(var(--color-text-main-2))] pb-4 lg:w-131.75">
            <p>{t("cart.shipping")}</p>
            <p>{shipping === 0 ? t("cart.free") : `$${shippingFormatted}`}</p>
          </div>

          <div className="flex w-full justify-between border-b border-[rgb(var(--color-text-main-2))] pb-4 lg:w-131.75">
            <p>{t("cart.total")}</p>
            <p>${total}</p>
          </div>
        </div>
        <div className="text-sm lg:text-base">{t("checkout.payment")}</div>
      </div>

      <div className="flex flex-col gap-6 lg:gap-25">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-4">
            <input
              placeholder={t("checkout.coupon")}
              type="text"
              value={couponInput}
              onChange={(e) => {
                setCouponInput(e.target.value);
                setCouponFieldError("");
                setCouponApplyError("");
                setCouponApplySuccess("");
              }}
              className="h-12 w-full rounded border border-[rgb(var(--color-border))] px-3 outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))] sm:h-14 lg:h-14 lg:w-75"
            />

            <Button
              type="button"
              disabled={hasInvalidQuantity || isCartEmpty}
              className="h-12 w-full shrink-0 text-sm sm:w-full md:w-57.5 md:text-base lg:h-auto"
              variant="outline"
              onClick={handleApplyClick}
            >
              {t("checkout.apply")}{" "}
            </Button>
          </div>
          {couponFieldError ? (
            <p className="text-sm text-red-500 sm:w-full lg:w-auto">
              {couponFieldError}
            </p>
          ) : null}

          {couponApplyError ? (
            <p className="text-sm text-red-500">{couponApplyError}</p>
          ) : null}
          {couponApplySuccess ? (
            <p className="text-sm text-green-600">{couponApplySuccess}</p>
          ) : null}
        </div>

        <AlertDialog
          open={couponConfirmOpen}
          onOpenChange={(open) => {
            setCouponConfirmOpen(open);
            if (!open) setCouponApplying(false);
          }}
        >
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("checkout.couponConfirmTitle")}
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-2 text-left">
                <span className="block">{t("checkout.couponConfirmBody")}</span>
                <span className="block font-mono text-sm text-foreground">
                  {couponInput.trim()}
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel type="button" disabled={couponApplying}>
                {t("checkout.couponConfirmCancel")}
              </AlertDialogCancel>

              <button
                type="button"
                onClick={() => void handleConfirmCoupon()}
                disabled={couponApplying}
                className="bg-black text-white px-3 py-1 rounded-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {couponApplying
                  ? t("checkout.couponApplying")
                  : t("checkout.couponConfirmApply")}{" "}
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="flex flex-col items-stretch gap-2 lg:items-end">
          {hasInvalidQuantity ? (
            <p className="text-sm text-red-500 sm:w-full lg:w-auto">
              {t("cart.valid")}
            </p>
          ) : null}
          {orderSuccess ? (
            <p className="text-sm text-green-600 lg:text-right">
              {orderSuccess}
            </p>
          ) : null}
          {orderErrorDisplay ? (
            <p className="whitespace-pre-line text-sm text-red-500 lg:text-right">
              {orderErrorDisplay}
            </p>
          ) : null}
          <div className="flex justify-stretch lg:justify-end">
            <Button
              type="button"
              disabled={orderLoading || hasInvalidQuantity || isCartEmpty}
              className="h-12 w-full text-sm md:w-57.5 md:text-base"
              variant="primary"
              onClick={() => {
                if (orderLoading || hasInvalidQuantity || isCartEmpty) return;
                void placeOrder();
              }}
            >
              {t("checkout.order")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
