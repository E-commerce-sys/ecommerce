/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import cancel from "../../assets/icons/cancel-fill.svg";
import arrow from "../../assets/icons/arrow-left.svg";

import { useCart } from "../../context/CartContext";

function Items() {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isRight = i18n.language === "ar" || i18n.language === "ku";

  function handleDelete(id) {
    removeItem(id);
  }

  return (
    <div className="md:mt-17">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-6 pt-6 mx-4 md:mx-10 lg:mx-40">
        {" "}
        <div>
          <span className="text-[rgb(var(--color-text-main-2))]">
            <Link to="/">{t("contact.home")}</Link> /
          </span>

          <span className="text-[rgb(var(--color-text-main))] ml-1">
            {t("cart.cart")}
          </span>
        </div>
        <p className="text-[20px] text-[rgb(var(--color-text-main))]">
          {t("cart.yourCart")} <span>({cartItems.length})</span>
        </p>
      </div>

      {/* ================= TABLE ================= */}
      <div className="my-15 justify-center w-full overflow-x-auto hidden sm:flex">
        {" "}
        <table
          className={`min-w-150 w-full mx-4 md:mx-10 lg:mx-40 ${isRight ? "text-right" : "text-left"}`}
        >
          <thead className="bg-[rgb(var(--color-grey))] sticky top-0 text-[20px] text-[rgb(var(--color-text-main))] [&_th]:font-medium">
            <tr>
              <th className="p-6">{t("cart.product")}</th>
              <th className="p-6">{t("cart.price")}</th>
              <th className="p-6">{t("cart.quantity")}</th>
              <th className="p-6">{t("cart.subtotal")}</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[rgb(var(--color-border))]"
              >
                {/* PRODUCT */}
                <td className="py-6 px-3 md:px-6 md:py-8.5">
                  <div className="flex gap-3 md:gap-5 items-center">
                    <img
                      src={item.img}
                      alt=""
                      className="w-10 h-10 md:w-12 md:h-12 object-contain"
                    />
                    <p className="text-sm md:text-base">{item.name}</p>
                  </div>
                </td>

                {/* PRICE */}
                <td className="py-6 px-3 md:px-6 md:py-8.5">${item.price}</td>

                {/* QUANTITY */}
                <td className="py-6 px-3 md:px-6 md:py-8.5">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    className="border border-[rgb(var(--color-text-main))]/40 rounded text-center h-11 w-18 outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-main))]"
                  />
                </td>

                {/* SUBTOTAL */}
                <td className="py-6 px-3 md:px-6 md:py-8.5">
                  <div className="flex justify-between items-center">
                    <p>${item.price * item.quantity}</p>

                    <img
                      className="cursor-pointer"
                      src={cancel}
                      alt=""
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ MOBILE CARDS */}
      <div className="flex flex-col gap-4 sm:hidden px-4 py-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border border-[rgb(var(--color-border))] shadow rounded-lg p-4 flex flex-col gap-4"
          >
            {/* PRODUCT */}
            <div className="flex flex-col items-center gap-2">
              <img src={item.img} alt="" className="w-16 h-16 object-contain" />
              <p className="text-sm text-center">{item.name}</p>
            </div>

            {/* PRICE */}
            <div className="flex justify-between text-sm">
              <span>{t("cart.price")}</span>
              <span>${item.price}</span>
            </div>

            {/* QUANTITY */}
            <div className="flex justify-between items-center text-sm">
              <span>{t("cart.quantity")}</span>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, e.target.value)}
                className="border border-[rgb(var(--color-text-main-2))] outline-none focus:ring-1 focus:ring-[rgb(var(--color-primary-main))] rounded w-16 h-10 text-center"
              />
            </div>

            {/* SUBTOTAL */}
            <div className="flex justify-between items-center text-sm">
              <span>{t("cart.subtotal")}</span>
              <div className="flex items-center gap-2">
                <span>${item.price * item.quantity}</span>
                <img
                  src={cancel}
                  className="cursor-pointer w-5 h-5"
                  onClick={() => handleDelete(item.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= CONTINUE BUTTON ================= */}
      <button
        onClick={() => navigate("/products")}
        className="flex gap-2 mx-4 md:mx-10 lg:mx-40 py-2 px-2 md:py-4 md:px-5 rounded border-2 border-[rgb(var(--color-border))]   w-fit items-center"
      >
        <img
          src={arrow}
          alt=""
          className={`w-5 h-5 md:w-7 md:h-7 ${isRight ? "rotate-180" : ""}`}
        />
        <p className="text-sm md:text-[16px]">{t("cart.continue")}</p>
      </button>
    </div>
  );
}

export default Items;
