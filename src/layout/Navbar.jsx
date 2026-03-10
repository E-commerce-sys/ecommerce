import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";

import { isLoggedIn } from "../helpers/auth";
import heart from "../assets/icons/heart-Icon.svg";
import profile from "../assets/icons/profile-icon.svg";
import basket from "../assets/icons/basket-icon.svg";
import menu from "../assets/icons/menu.svg";

import SearchBar from "../features/search/SearchBar";
import LanguageList from "../features/langauge/LanguageList";

function Navbar() {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { dir } = useLanguage();
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const loggedIn = isLoggedIn();
  const languages = ["en", "ar", "ku"];

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full py-3 border-b border-b-[rgb(var(--color-border))] bg-white z-[1000]">
      {" "}
      <div className="flex w-full text-lg justify-around items-center text-[rgb(var(--color-text-main))]">
        {/* Logo */}
        <NavLink to="/">
          <p className="font-bold text-lg md:text-xl lg:text-2xl cursor-pointer ">
            Exclusive
          </p>
        </NavLink>

        {/* Search (always visible) */}
        <div>
          <SearchBar />
        </div>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex justify-between items-center gap-5">
          <LanguageList />

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex justify-center items-center gap-1 cursor-pointer ${
                isActive &&
                "py-1 border-b border-b-[rgb(var(--color-primary-main))]"
              }`
            }
          >
            <img src={basket} className="w-6 h-6" />
            <p className="text-sm">{t("navbar.basket")}</p>
          </NavLink>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `flex justify-center items-center gap-1 cursor-pointer ${
                isActive &&
                "py-1 border-b border-b-[rgb(var(--color-primary-main))]"
              }`
            }
          >
            <img src={heart} className="w-6 h-6" />
            <p className="text-sm">{t("navbar.favourite")}</p>
          </NavLink>

          {loggedIn ? (
            <NavLink
              to="/account"
              className={({ isActive }) =>
                `flex justify-center items-center gap-1 cursor-pointer ${
                  isActive &&
                  "py-1 border-b border-b-[rgb(var(--color-primary-main))]"
                }`
              }
            >
              <img src={profile} className="w-6 h-6" />
              <p className="text-sm">{t("navbar.account")}</p>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex justify-center items-center gap-1 cursor-pointer ${
                  isActive &&
                  "py-1 border-b border-b-[rgb(var(--color-primary-main))]"
                }`
              }
            >
              <img src={profile} className="w-6 h-6" />
              <p className="text-sm">{t("navbar.login")}</p>
            </NavLink>
          )}
        </div>

        {/* menu Icon (mobile only) */}
        <div className="lg:hidden">
          <button onClick={() => setOpen(!open)}>
            <img src={menu} className="w-7 h-7" />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {open && (
        <div
          ref={menuRef}
          className={`lg:hidden absolute top-14 bg-white border border-[rgb(var(--color-border))] rounded-md shadow-md flex flex-col p-3 gap-3 z-1000
  ${dir === "rtl" ? "left-1 md:left-6" : "right-1 md:right-6"}`}
        >
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex items-center gap-2 ${
                isActive &&
                "py-1 border-b border-b-[rgb(var(--color-primary-main))]"
              }`
            }
          >
            <img src={profile} className="w-5 h-5" />
            {t("navbar.login")}
          </NavLink>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `flex items-center gap-2 ${
                isActive &&
                "py-1 border-b border-b-[rgb(var(--color-primary-main))]"
              }`
            }
          >
            <img src={heart} className="w-5 h-5" />
            {t("navbar.favourite")}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center gap-2 ${
                isActive &&
                "py-1 border-b border-b-[rgb(var(--color-primary-main))]"
              }`
            }
          >
            <img src={basket} className="w-5 h-5" />
            {t("navbar.basket")}
          </NavLink>

          {/* Language selection */}
          <div className="flex gap-2 mt-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`px-3 py-1 border rounded ${
                  language === lang
                    ? "border-[rgb(var(--color-primary-main))]"
                    : "border-gray-300"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
