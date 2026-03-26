/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Form from "../features/checkout/Form";

function CheckoutPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  return (
    <div className="mt-17">
      <div className="flex flex-col gap-10 pt-6 mx-4 md:mx-10 lg:mx-40">
        {" "}
        <div>
          <span className="text-[rgb(var(--color-text-main-2))]">
            <Link to="/">{t("contact.home")}</Link> /
          </span>

          <span className="text-[rgb(var(--color-text-main-2))]">
            <Link to="/cart">{t("cart.cart")}</Link> /
          </span>

          <span className="text-[rgb(var(--color-text-main))] ml-1">
            {t("checkout.checkout")}{" "}
          </span>
        </div>
        <p className="font-medium text-[36px]">{t("checkout.billing")}</p>
      </div>

      <div className="flex justify-center mx-4 md:mx-0 lg:mx-40">
        <Form cartItems={cartItems} />{" "}
      </div>
    </div>
  );
}

export default CheckoutPage;
