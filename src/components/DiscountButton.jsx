import { useTranslation } from "react-i18next";

function DiscountButton({ discountRate, colorVar, colorText, onSelect }) {
  const { t } = useTranslation();
  return (
    <button
      onClick={() => onSelect(discountRate)}
      className="flex flex-col items-center justify-center w-full h-28 rounded-lg px-4 py-3 cursor-pointer hover:shadow-md transition"
      style={{
        backgroundColor: `rgb(var(${colorVar}))`,
        color: `rgb(var(${colorText}))`,
      }}
    >
      <span className="text-2xl md:text-3xl lg:4xl font-bold">
        %{discountRate}
      </span>
      <span className="text-md md:text-lg lg:2xl mt-1">{t("discount")}</span>
    </button>
  );
}

export default DiscountButton;
