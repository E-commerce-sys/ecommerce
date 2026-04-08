/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";
import { Form } from "react-router-dom";

/* eslint-disable react/react-in-jsx-scope */
import { useCheckoutAddress } from "../../context/CheckoutAddressContext";

function Adress() {
  const { t } = useTranslation();
  const {
    savedAddresses,
    addressLoading,
    placeholderValue,
    selectedOption,
    setSelectedOption,
    formData,
    updateFormField,
  } = useCheckoutAddress();

  function handleSubmit(e) {
    e.preventDefault();
  }

  const inputStyle =
    "bg-[rgb(var(--color-grey))] rounded px-3 h-[50px] outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-main))] transition";
  return (
    <Form
      onSubmit={handleSubmit}
      className="flex w-full min-w-0 flex-col gap-6"
    >
      <div className="flex w-full min-w-0 flex-col gap-6 lg:gap-7.5">
        <div className="flex w-full min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
          <p className="shrink-0 text-xl font-medium lg:text-2xl">
            {t("checkout.address")}
          </p>
          <select
            className="min-w-0 w-full rounded-md border border-[rgb(var(--color-border))] bg-[rgb(var(--color-grey))] px-3 py-2.5 text-sm outline-none focus:border-[rgb(var(--color-primary-main))] focus:ring-1 focus:ring-[rgb(var(--color-primary-main))] lg:max-w-md disabled:cursor-not-allowed disabled:opacity-60"
            value={selectedOption}
            disabled={addressLoading}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value={placeholderValue}>
              {t("checkout.chooseSavedAddress")}
            </option>
            {savedAddresses.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-[rgb(var(--color-border))] p-4 sm:p-6 lg:gap-5 lg:p-7.5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium lg:text-base">
              {t("checkout.city")}
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={updateFormField}
              className={`${inputStyle} w-full`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium lg:text-base">
              {t("checkout.street")}
            </label>
            <input
              type="text"
              name="streetName"
              value={formData.streetName}
              onChange={updateFormField}
              className={`${inputStyle} w-full`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium lg:text-base">
              {t("checkout.apartment")}
            </label>
            <input
              type="text"
              name="houseNumber"
              value={formData.houseNumber}
              onChange={updateFormField}
              className={`${inputStyle} w-full`}
            />
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 sm:items-center sm:gap-4">
        <input
          type="checkbox"
          name="saveInfo"
          checked={formData.saveInfo}
          onChange={updateFormField}
          className="h-5 w-5 cursor-pointer accent-[rgb(var(--color-primary-main))]"
        />
        <p>{t("checkout.save")}</p>
      </div>
    </Form>
  );
}

export default Adress;
