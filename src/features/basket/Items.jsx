/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import cancel from "../../assets/icons/cancel-fill.svg";
import arrow from "../../assets/icons/arrow-left.svg";

function Items({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRight = i18n.language == "ar" || i18n.language == "ku";
  function handleQuantityChange(id, value) {
    if (value < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: value } : item,
      ),
    );
  }

  function handleDelete(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="mt-17">
      <div className="flex flex-col gap-10 pt-6 mx-40">
        <div>
          <span className="text-[rgb(var(--color-text-main-2))]">
            <Link to="/">{t("contact.home")}</Link> /
          </span>

          <span className="text-[rgb(var(--color-text-main))] ml-1">
            {t("cart.cart")}{" "}
          </span>
        </div>
        <p className="text-[20px] text-[rgb(var(--color-text-main))]">
          {t("cart.yourCart")} <span>({cartItems.length})</span>
        </p>
      </div>
      <div className="my-15 flex justify-center w-full scroll-smooth">
        <table
          className={`w-full mx-40 ${isRight ? "text-right" : "text-left"} `}
        >
          <thead className="bg-[rgb(var(--color-grey))] mt-40 sticky top-0  text-[20px] text-[rgb(var(--color-text-main))] [&_th]:font-medium">
            <tr>
              <th className="p-6">{t("cart.product")}</th>
              <th className="p-6">{t("cart.price")}</th>
              <th className="p-6">{t("cart.quantity")}</th>
              <th className="p-6">{t("cart.subtotal")} </th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
              <tr
                key={item.id}
                className="mb-9 border-b border-[rgb(var(--color-border))]"
              >
                <td className="py-8.5 px-6 ">
                  <div className="flex gap-5 items-center">
                    <img
                      src={item.img}
                      alt=""
                      className="w-12 h-12 object-contain"
                    />
                    <p>{item.name}</p>
                  </div>
                </td>
                <td className="py-8.5 px-6">{`$${item.price}`}</td>
                <td className="py-8.5 px-6">
                  <input
                    type="number"
                    className="border border-[rgb(var(--color-text-main))]/40 rounded text-center h-11 w-18"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                  />
                </td>
                <td className="py-8.5 px-6">
                  <div className="flex justify-between">
                    <p>{`$${Number(item.price) * item.quantity}`}</p>
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
      </div>{" "}
      <button
        onClick={() => navigate("/products")}
        className="flex gap-2 mx-40 py-4 px-5 rounded border-2 border-[rgb(var(--color-border))] cursor-pointer"
      >
        <img src={arrow} alt="" className={`${isRight ? "rotate-180" : ""}`} />
        <p>{t("cart.continue")}</p>
      </button>
    </div>
  );
}

export default Items;
