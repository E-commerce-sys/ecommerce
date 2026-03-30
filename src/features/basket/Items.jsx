/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import cancel from "../../assets/icons/cancel-fill.svg";
import arrow from "../../assets/icons/arrow-left.svg";

import { useCart } from "../../context/CartContext";

function Items() {
  const { cartItems, updateQuantity, updateColor, updateSize, removeItem } =
    useCart();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isRight = i18n.language === "ar" || i18n.language === "ku";

  function handleDelete(id) {
    removeItem(id);
  }

  return (
    <div className="md:mt-17">
      {/* HEADER */}
      <div className="flex flex-col gap-6 pt-6 mx-4 md:mx-10 lg:mx-40">
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

      {/* TABLE */}
      <div className="my-15 justify-center w-full overflow-x-auto hidden sm:flex">
        <table
          className={`min-w-150 w-full mx-4 md:mx-10 lg:mx-40 ${
            isRight ? "text-right" : "text-left"
          }`}
        >
          <thead className="bg-[rgb(var(--color-grey))] sticky top-0 text-[20px] text-[rgb(var(--color-text-main))] [&_th]:font-medium">
            <tr>
              <th className="p-6">{t("cart.product")}</th>
              <th className="p-6">{t("cart.price")}</th>
              <th className="p-6">{t("cart.color")}</th>
              <th className="p-6">{t("cart.size")}</th>
              <th className="p-6">{t("cart.quantity")}</th>
              <th className="p-6">{t("cart.subtotal")}</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => {
              const selectedColor = item.colors.find(
                (c) => c.id === item.selectedColorId,
              );

              const selectedSize = selectedColor?.sizes.find(
                (s) => s.id === item.selectedSizeId,
              );

              return (
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

                  {/* COLOR */}
                  <td className="py-6 px-3 md:px-6 md:py-8.5">
                    <select
                      value={item.selectedColorId}
                      onChange={(e) =>
                        updateColor(item.id, Number(e.target.value))
                      }
                      className="border border-[rgb(var(--color-text-main))]/40 rounded text-center h-11  outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))] px-2 cursor-pointer"
                    >
                      {item.colors.map((color) => (
                        <option
                          key={color.id}
                          value={color.id}
                          disabled={color.totalStock === 0}
                          className="disabled:text-[rgb(var(--color-text-main))]/40"
                        >
                          {color.name}{" "}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* SIZE */}
                  <td className="py-6 px-3 md:px-6 md:py-8.5">
                    <select
                      value={item.selectedSizeId}
                      onChange={(e) =>
                        updateSize(item.id, Number(e.target.value))
                      }
                      className="border border-[rgb(var(--color-text-main))]/40 rounded text-center h-11  outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))] px-2 cursor-pointer"
                    >
                      {selectedColor?.sizes.map((size) => (
                        <option
                          key={size.id}
                          value={size.id}
                          disabled={size.stock === 0}
                          className="disabled:text-[rgb(var(--color-text-main))]/40"
                        >
                          {size.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* QUANTITY */}
                  <td className="py-6 px-3 md:px-6 md:py-8.5">
                    <input
                      type="number"
                      min="1"
                      max={selectedSize?.stock || 1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                      onBlur={() => {
                        if (item.quantity === "" || item.quantity < 1) {
                          updateQuantity(item.id, 1); // reset to 1
                        }
                      }}
                      className="border border-[rgb(var(--color-text-main))]/40 rounded text-center h-11 w-18 outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))]"
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
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="flex flex-col gap-4 sm:hidden px-4 py-4">
        {cartItems.map((item) => {
          const selectedColor = item.colors.find(
            (c) => c.id === item.selectedColorId,
          );

          const selectedSize = selectedColor?.sizes.find(
            (s) => s.id === item.selectedSizeId,
          );

          return (
            <div
              key={item.id}
              className="relative border border-[rgb(var(--color-border))] shadow rounded-lg p-4 flex flex-col gap-4"
            >
              {/*DELETE BUTTON */}
              <img
                src={cancel}
                className="absolute top-3 right-3 cursor-pointer w-5 h-5"
                onClick={() => handleDelete(item.id)}
              />

              {/* ✅ PRODUCT CENTERED */}
              <div className="flex flex-col items-center gap-2">
                <img src={item.img} className="w-16 h-16 object-contain" />
                <p className="text-sm text-center">{item.name}</p>
              </div>

              {/* COLOR */}
              <div className="flex gap-4 w-full items-center">
                <p>Color:</p>
                <select
                  value={item.selectedColorId}
                  onChange={(e) => updateColor(item.id, Number(e.target.value))}
                  className="border border-[rgb(var(--color-text-main))]/40 rounded text-center h-11 outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))] w-full"
                >
                  {item.colors.map((color) => (
                    <option
                      key={color.id}
                      value={color.id}
                      disabled={color.totalStock === 0}
                    >
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* SIZE */}
              <div className="flex gap-4 w-full items-center">
                <p>Size:</p>
                <select
                  value={item.selectedSizeId}
                  onChange={(e) => updateSize(item.id, Number(e.target.value))}
                  className="border border-[rgb(var(--color-text-main))]/40 rounded text-center h-11 outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))] w-full"
                >
                  {selectedColor?.sizes.map((size) => (
                    <option
                      key={size.id}
                      value={size.id}
                      disabled={size.stock === 0}
                    >
                      {size.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* QUANTITY */}
              <div className="flex gap-4 w-full items-center">
                <p>Quantity:</p>
                <input
                  type="number"
                  min="1"
                  max={selectedSize?.stock || 1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                  onBlur={() => {
                    if (item.quantity === "" || item.quantity < 1) {
                      updateQuantity(item.id, 1);
                    }
                  }}
                  className="border border-[rgb(var(--color-text-main))]/40 rounded text-center h-11 outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))] w-full"
                />
              </div>

              {/* SUBTOTAL */}
              <div className="flex justify-between">
                <span>
                  {t("cart.subtotal")}: ${item.price * item.quantity}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CONTINUE */}
      <button
        onClick={() => navigate("/products")}
        className="flex gap-2 mx-4 md:mx-10 lg:mx-40 py-2 px-2 md:py-4 md:px-5 rounded border-2 border-[rgb(var(--color-border))] w-fit items-center cursor-pointer"
      >
        <img
          src={arrow}
          className={`w-5 h-5 md:w-7 md:h-7 ${isRight ? "rotate-180" : ""}`}
        />
        <p>{t("cart.continue")}</p>
      </button>
    </div>
  );
}

export default Items;
