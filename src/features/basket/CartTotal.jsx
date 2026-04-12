import Button from "../../components/Button";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";
import {
  ORDER_ERROR_ADDRESS_REQUIRED,
  useCheckoutAddress,
} from "../../context/CheckoutAddressContext";

function CartTotal() {
  const { cartItems, subtotal, shipping, shippingFormatted, total } = useCart();
  const { t } = useTranslation();
  const { placeOrder, orderLoading, orderError, orderSuccess } =
    useCheckoutAddress();

  const orderErrorDisplay =
    orderError === ORDER_ERROR_ADDRESS_REQUIRED
      ? t("checkout.addressRequired")
      : orderError;

  const hasInvalidQuantity = cartItems?.some(
    (item) => item.quantity === "" || item.quantity < 1,
  );

  const isCartEmpty = cartItems.length === 0;

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
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-4">
          <input
            placeholder={t("checkout.coupon")}
            type="text"
            className="h-12 w-full rounded border border-[rgb(var(--color-border))] px-3 outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))] sm:h-14 lg:h-14 lg:w-75"
          />
          {hasInvalidQuantity ? (
            <p className="text-sm text-red-500 sm:w-full lg:w-auto">
              {t("cart.valid")}
            </p>
          ) : null}
          <Button
            disabled={hasInvalidQuantity || isCartEmpty}
            className="h-12 w-full shrink-0 text-sm sm:w-full md:w-57.5 md:text-base lg:h-auto"
            variant="outline"
          >
            {t("checkout.apply")}{" "}
          </Button>
        </div>
        <div className="flex flex-col items-stretch gap-2 lg:items-end">
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
