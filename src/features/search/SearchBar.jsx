/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import search from "../../assets/icons/search-Icon.svg";

function SearchBar() {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <img
        src={search}
        alt="search"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60"
      />

      <input
        type="text"
        placeholder={`${t("navbar.search")}`}
        className="
          lg:w-130
          md:w-100
          w-50
          pl-10
          pr-4
          py-2
          rounded-sm
          bg-[rgb(var(--color-grey))]
          text-normal
          outline-none
          placeholder:text-gray-400
          placeholder:text-base
          focus:ring-1
          focus:ring-[rgb(var(--color-primary-main))]
          transition-all duration-300
        "
      />
    </div>
  );
}

export default SearchBar;
