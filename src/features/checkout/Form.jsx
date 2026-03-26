/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Form } from "react-router-dom";
import { useState } from "react";
import Apply from "./Apply";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";

function CheckoutForm() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    street: "",
    apartment: "",
    saveInfo: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log("FORM DATA:", formData);

    // later → call API here
  }

  const inputStyle =
    "bg-[rgb(var(--color-grey))] rounded px-3 h-[50px] outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-main))] transition";

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col xl:flex-row gap-10 lg:gap-30 w-full my-10 lg:my-17"
      >
        {/* ================= PERSONAL INFO ================= */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-7.5">
            <p className="text-2xl">{t("checkout.info")}</p>

            <div className="flex flex-col gap-5 border border-[rgb(var(--color-border))] rounded-lg p-7.5">
              <div className="flex flex-col md:flex-row gap-5">
                {" "}
                <div className="flex flex-col gap-2">
                  <label>{t("checkout.firstName")}</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`${inputStyle} w-full md:w-[230px]`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>{t("checkout.lastName")}</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`${inputStyle} w-full md:w-[230px]`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label>{t("checkout.email")}</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`${inputStyle} w-full md:w-[480px]`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>{t("checkout.phone")}</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${inputStyle} w-full md:w-[480px]`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>{t("checkout.company")}</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`${inputStyle} w-full md:w-[480px]`}
                />
              </div>
            </div>
          </div>

          {/* ================= ADDRESS ================= */}
          <div className="flex flex-col gap-7.5">
            <p className="text-2xl">{t("checkout.address")}</p>

            <div className="flex flex-col gap-5 border border-[rgb(var(--color-border))] rounded-lg p-7.5">
              <div className="flex flex-col gap-2">
                <label>{t("checkout.city")}</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className={`${inputStyle} w-full md:w-[480px]`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>{t("checkout.street")}</label>
                <input
                  type="text"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleChange}
                  className={`${inputStyle} w-full md:w-[480px]`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>{t("checkout.apartment")}</label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  className={`${inputStyle} w-full md:w-[480px]`}
                />
              </div>
            </div>
          </div>

          {/* ================= CHECKBOX ================= */}
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleChange}
              className="w-5 h-5 cursor-pointer accent-[rgb(var(--color-primary-main))]"
            />
            <p>{t("checkout.save")}</p>
          </div>
        </div>

        {/* ================= SUBMIT ================= */}
        <div className="flex flex-col gap-10 xl:gap-100 w-full">
          {" "}
          <Apply />
          <div className="flex justify-end">
            <Button type="submit" className="w-full xl:w-[214px]">
              {t("checkout.order")}{" "}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default CheckoutForm;
