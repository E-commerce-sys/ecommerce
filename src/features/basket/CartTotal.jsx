/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";

function CartTotal({ cartItems }) {
  const { t } = useTranslation();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = subtotal >= 140 ? 0 : 20; // later dynamic
  const total = subtotal + shipping;

  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-9 justify-center mx-40 my-20 border border-[rgb(var(--color-border))] rounded-lg px-5 py-6.5">
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
      <div className="flex justify-end">
        <Button className="w-[235px]" onClick={() => navigate("/checkout")}>
          {t("cart.procees")}{" "}
        </Button>
      </div>
    </div>
  );
}

export default CartTotal;
