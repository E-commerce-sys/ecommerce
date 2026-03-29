/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button";

function Apply() {
  const { subtotal, shipping, total } = useCart(); // ✅ direct access
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-15">
      <div className="flex flex-col gap-15 text-[18px]">
        <div className="flex flex-col gap-7.5">
          <div className="flex justify-between py-4 w-full lg:w-131.75 border-b border-[rgb(var(--color-text-main-2))]">
            <p>{t("cart.sub")}</p>
            <p>${subtotal}</p>
          </div>

          <div className="flex justify-between py-4 w-full lg:w-131.75 border-b border-[rgb(var(--color-text-main-2))]">
            <p>{t("cart.shipping")}</p>
            <p>{shipping === 0 ? t("cart.free") : `$${shipping}`}</p>
          </div>

          <div className="flex justify-between py-4 w-full lg:w-131.75 border-b border-[rgb(var(--color-text-main-2))]">
            <p>{t("cart.total")}</p>
            <p>${total}</p>
          </div>
        </div>
        <div>{t("checkout.payment")}</div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          placeholder={t("checkout.coupon")}
          type="text"
          className="rounded border border-[rgb(var(--color-border))] w-full lg:w-75 h-14 px-3 outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-main))]"
        />

        <Button className="w-full lg:w-52.75 h-14" variant="outline">
          {t("checkout.apply")}{" "}
        </Button>
      </div>
    </div>
  );
}

export default Apply;
