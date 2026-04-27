import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import cancel from "../../assets/icons/cancel-fill.svg";
import arrow from "../../assets/icons/arrow-left.svg";

import { useCart } from "../../context/CartContext";
import { useCheckoutAddress } from "../../context/CheckoutAddressContext";

/** Per line item max (matches backend / product detail). */
const MAX_CART_LINE_QTY = 100;

function clampLineQuantity(n) {
  const q = Number(n);
  if (!Number.isFinite(q)) return 1;
  return Math.min(MAX_CART_LINE_QTY, Math.max(1, Math.floor(q)));
}

function displayQuantityForLine(lineQty, item) {
  const raw = lineQty[item.id];
  if (raw === undefined) return String(item.quantity);
  return raw;
}

function numericQtyForSubtotal(lineQty, item) {
  const raw = lineQty[item.id] ?? String(item.quantity);
  if (raw === "") return clampLineQuantity(Number(item.quantity) || 1);
  const n = Number(raw);
  if (isNaN(n) || n < 1) return clampLineQuantity(Number(item.quantity) || 1);
  return clampLineQuantity(n);
}

function Items() {
  const { cartItems, updateQuantity, removeItem, persistCartItemQuantity } =
    useCart();

  const { outOfStockCartItemId, clearOutOfStockHighlight } =
    useCheckoutAddress();

  const [lineQty, setLineQty] = useState({});

  function lineIsOutOfStockHighlight(item) {
    if (outOfStockCartItemId == null) return false;
    return Number(outOfStockCartItemId) === Number(item.id);
  }

  useEffect(() => {
    setLineQty((prev) => {
      const next = { ...prev };
      for (const it of cartItems) {
        if (next[it.id] === undefined) {
          next[it.id] = String(clampLineQuantity(it.quantity));
        }
      }
      for (const k of Object.keys(next)) {
        const id = Number(k);
        if (!cartItems.some((c) => c.id === id)) {
          delete next[k];
        }
      }
      return next;
    });
  }, [cartItems]);
  function commitLineQuantity(item) {
    const raw = lineQty[item.id] ?? String(item.quantity);
    let q = Number(raw);
    if (raw === "" || isNaN(q) || q < 1) {
      q = 1;
      setLineQty((l) => ({ ...l, [item.id]: "1" }));
    } else {
      q = clampLineQuantity(q);
      setLineQty((l) => ({ ...l, [item.id]: String(q) }));
    }
    updateQuantity(item.id, q);
    void persistCartItemQuantity(item.id, q);
  }
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isRight = i18n.language === "ar" || i18n.language === "ku";

  function handleDelete(cartItemId) {
    clearOutOfStockHighlight();
    removeItem(cartItemId);
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
              const oos = lineIsOutOfStockHighlight(item);
              return (
                <tr
                  key={item.id}
                  className={`border-b border-[rgb(var(--color-border))] ${
                    oos ? "bg-red-500/5 ring-2 ring-inset ring-red-500" : ""
                  }`}
                >
                  {/* PRODUCT */}
                  <td className="py-6 px-3 md:px-6 md:py-8.5">
                    <div className="flex gap-3 md:gap-5 items-center">
                      <img
                        src={item.img}
                        alt=""
                        className="w-10 h-10 md:w-12 md:h-12 object-contain"
                      />
                      <p className="text-sm md:text-base">
                        {i18n.language === "ar"
                          ? item.nameAr
                          : i18n.language === "ku"
                            ? item.nameKu
                            : item.nameEn}
                      </p>
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className="py-6 px-3 md:px-6 md:py-8.5">${item.price}</td>

                  {/* COLOR (variant — read-only) */}
                  <td className="py-6 px-3 md:px-6 md:py-8.5">
                    {item.colorLabel ?? "—"}
                  </td>

                  {/* SIZE (variant — read-only) */}
                  <td className="py-6 px-3 md:px-6 md:py-8.5">
                    {item.sizeLabel ?? "—"}
                  </td>

                  {/* QUANTITY */}
                  <td className="py-6 px-3 md:px-6 md:py-8.5">
                    <input
                      type="number"
                      min={1}
                      max={MAX_CART_LINE_QTY}
                      value={displayQuantityForLine(lineQty, item)}
                      onChange={(e) => {
                        clearOutOfStockHighlight();
                        setLineQty((l) => ({
                          ...l,
                          [item.id]: e.target.value,
                        }));
                      }}
                      onBlur={() => commitLineQuantity(item)}
                      className="border border-[rgb(var(--color-text-main))]/40 rounded text-center h-11 w-18 outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))]"
                    />
                  </td>

                  {/* SUBTOTAL */}
                  <td className="py-6 px-3 md:px-6 md:py-8.5">
                    <div className="flex justify-between items-center">
                      <p>
                        $
                        {Number(
                          (
                            item.price * numericQtyForSubtotal(lineQty, item)
                          ).toFixed(2),
                        )}
                      </p>

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
          const oos = lineIsOutOfStockHighlight(item);
          return (
            <div
              key={item.id}
              className={`relative shadow rounded-lg p-4 flex flex-col gap-4 ${
                oos
                  ? "border-2 border-red-500 bg-red-500/5"
                  : "border border-[rgb(var(--color-border))]"
              }`}
            >
              <img
                src={cancel}
                className="absolute top-3 right-3 cursor-pointer w-5 h-5"
                alt=""
                onClick={() => handleDelete(item.id)}
              />

              <div className="flex flex-col items-center gap-2">
                <img
                  src={item.img}
                  className="w-26 h-26 object-contain"
                  alt=""
                />
                <p className="text-sm text-center">
                  {i18n.language === "ar"
                    ? item.nameAr
                    : i18n.language === "ku"
                      ? item.nameKu
                      : item.nameEn}
                </p>
              </div>

              {item.colorLabel && (
                <div className="flex gap-4 w-full justify-between items-center">
                  <p className="w-[20%]">{t("cart.color")}</p>
                  <p className="w-[80%] text-right sm:text-left">
                    {item.colorLabel}
                  </p>
                </div>
              )}

              {item.sizeLabel && (
                <div className="flex gap-4 w-full justify-between items-center">
                  <p className="w-[20%]">{t("cart.size")}</p>
                  <p className="w-[80%] text-right sm:text-left">
                    {item.sizeLabel}
                  </p>
                </div>
              )}

              {/* QUANTITY */}
              <div className="flex gap-4 w-full justify-between items-center">
                <p className="w-[20%]">{t("cart.quantity")}</p>
                <input
                  type="number"
                  min={1}
                  max={MAX_CART_LINE_QTY}
                  value={displayQuantityForLine(lineQty, item)}
                  onChange={(e) => {
                    clearOutOfStockHighlight();
                    setLineQty((l) => ({
                      ...l,
                      [item.id]: e.target.value,
                    }));
                  }}
                  onBlur={() => commitLineQuantity(item)}
                  className="border border-[rgb(var(--color-text-main))]/40 rounded text-center h-11 outline-none focus:ring focus:ring-[rgb(var(--color-primary-main))] w-[80%] md:w-full"
                />
              </div>

              <div className="flex justify-between">
                <span>
                  {t("cart.subtotal")}: $
                  {Number(
                    (item.price * numericQtyForSubtotal(lineQty, item)).toFixed(
                      2,
                    ),
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CONTINUE */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={() => navigate("/search")}
          className="flex gap-2 mx-4 md:mx-10 lg:mx-40 py-2 px-2 md:py-4 md:px-5 rounded border-2 border-[rgb(var(--color-border))] w-fit items-center cursor-pointer text-sm md:text-base"
        >
          <img
            src={arrow}
            alt=""
            className={`w-5 h-5 md:w-7 md:h-7 ${isRight ? "rotate-180" : ""}`}
          />
          <p>{t("cart.continue")}</p>
        </button>
      </div>
    </div>
  );
}

export default Items;
