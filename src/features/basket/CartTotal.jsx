/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";

import { useCart } from "../../context/CartContext";

function CartTotal() {
  const { cartItems, subtotal, shipping, total } = useCart();
  const { t } = useTranslation();

  const hasInvalidQuantity = cartItems.some(
    (item) => item.quantity === "" || item.quantity < 1,
  );

  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-9 justify-center mx-4 md:mx-10 lg:mx-40 my-10 md:my-20 border border-[rgb(var(--color-text-main-2))] rounded-lg px-5 py-6.5">
      <div className="flex flex-col gap-3">
        <p className="font-medium text-[24px]">{t("cart.cartTotal")}</p>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between w-full border-b border-[rgb(var(--color-text-main-2))] py-4">
            <p> {t("cart.sub")}</p>
            <p>${subtotal}</p>
          </div>
          <div className="flex justify-between w-full border-b border-[rgb(var(--color-text-main-2))] py-4">
            <p>{t("cart.shipping")}</p>
            <p>{shipping === 0 ? `${t("cart.free")}` : `$${shipping}`}</p>
          </div>
          <div className="flex justify-between w-full border-b border-[rgb(var(--color-text-main-2))] py-4">
            <p> {t("cart.total")}</p>
            <p>${total}</p>{" "}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 justify-end">
        {hasInvalidQuantity && (
          <p className="text-red-500 text-sm">Please enter valid quantities</p>
        )}
        <Button
          disabled={hasInvalidQuantity}
          className="w-full md:w-[230px] "
          onClick={() =>
            navigate("/checkout", {
              state: { cartItems },
            })
          }
        >
          {t("cart.procees")}{" "}
        </Button>
      </div>
    </div>
  );
}

export default CartTotal;
