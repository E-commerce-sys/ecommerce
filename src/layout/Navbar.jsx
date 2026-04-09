/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { NavLink,useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

import heart from "../assets/icons/heart.svg";
import profile from "../assets/icons/profile.svg";
import basket from "../assets/icons/basket.svg";
import menu from "../assets/icons/menu.svg";
import logoutIcon from "../assets/icons/logout.svg";
import mallbag from "../assets/icons/mallbag.svg";
import logo from "../assets/icons/logo.svg";
import SearchBar from "../features/search/SearchBar";
import LanguageList from "../features/langauge/LanguageList";

function Navbar() {
  const { t } = useTranslation();
  const { language, changeLanguage, dir } = useLanguage();
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { loggedIn, logout } = useAuth();
  const languages = ["en", "ar", "ku"];
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);
  const location = useLocation();
  const { pathname } = location;
  const hideNavbarOn = ["/login", "/register", "/register/verify"];

  const shouldHideNavbar = hideNavbarOn.includes(pathname);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }

      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full py-3 border-b border-b-[rgb(var(--color-border))] bg-white z-1000">
      {" "}
      <div className="flex w-full min-w-0 max-w-full items-center justify-between gap-2 px-2 text-lg text-[rgb(var(--color-text-main))] md:gap-3 md:px-4">
        {/* Logo */}
        <NavLink to="/" className="shrink-0">
          <div className="flex gap-2 items-center">
            <img src={logo} alt="" className="w-6 h-8 md:w-7 md:h-9" />
            <p className="font-bold text-lg md:text-xl lg:text-2xl cursor-pointer ">
              Exclusive
            </p>
          </div>
        </NavLink>

        {/* Search */}
        {!shouldHideNavbar && (<div className="min-w-0 max-w-full flex-1 px-1 md:px-2">
          <SearchBar />
        </div>)}

        {/* Desktop Right Side */}
        <div className="hidden shrink-0 items-center justify-end gap-3 lg:flex lg:gap-5">
          <LanguageList />

          {!shouldHideNavbar && (<NavLink
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
          </NavLink>)}

          {!shouldHideNavbar && (
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `flex justify-center items-center gap-1 cursor-pointer ${
              isActive && "py-1 border-b border-b-[rgb(var(--color-primary-main))]"
            }`
          }
        >
          <img src={heart} className="w-6 h-6" />
          <p className="text-sm">{t("navbar.favourite")}</p>
        </NavLink>
      )}

          {loggedIn ? (
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex justify-center items-center gap-1 cursor-pointer"
              >
                <img src={profile} className="w-6 h-6" />
                <p className="text-sm">{t("navbar.account")}</p>
              </button>

              {accountOpen && (
                <div
                  className={`absolute top-10 ${dir === "rtl" ? "left-0 " : "right-0"} bg-[rgb(var(--color-grey))] w-56 border border-[rgb(var(--color-border))] rounded-md shadow-md flex flex-col min-w-40 z-50`}
                >
                  <NavLink
                    to="/account/profile"
                    className="px-3 py-2 items-center hover:bg-gray-200 text-sm flex gap-2"
                    onClick={() => setAccountOpen(false)}
                  >
                    <img src={profile} alt="" />
                    <span> {t("account.profile")}</span>
                  </NavLink>

                  <NavLink
                    to="/account/progress"
                    className="px-4 py-2 items-center hover:bg-gray-200 text-sm flex gap-4"
                    onClick={() => setAccountOpen(false)}
                  >
                    <img src={mallbag} alt="" />
                    <span>{t("account.orders")}</span>
                  </NavLink>
                  <NavLink to="/" className="px-4 py-2 items-center hover:bg-gray-200 text-sm flex gap-4">
                  <button
                    onClick={() => logout()}
                    className="items-center flex gap-4 cursor-pointer"
                  >
                    <img src={logoutIcon} alt="" />
                    <span>{t("account.logout")}</span>
                  </button>
                  </NavLink>
                </div>
              )}
            </div>
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
          {loggedIn ? (
            <NavLink
              onClick={() => setOpen(true)}
              to="/account"
              className={({ isActive }) =>
                `flex items-center gap-2 ${
                  isActive &&
                  "py-1 border-b border-b-[rgb(var(--color-primary-main))]"
                }`
              }
            >
              <img src={profile} className="w-5 h-5" />
              {t("navbar.account")}
            </NavLink>
          ) : (
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
          )}

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
