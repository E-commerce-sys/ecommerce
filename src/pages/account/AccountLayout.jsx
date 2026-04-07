/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useUser } from "../../context/ProfileContext";

function navClass(isActive) {
  return `whitespace-nowrap rounded-md px-2 py-1 text-sm transition-colors lg:px-0 lg:py-1 lg:text-base ${
    isActive
      ? "bg-[rgb(var(--color-primary-1))] font-medium text-[rgb(var(--color-primary-5))] lg:bg-transparent"
      : "text-[rgb(var(--color-text-main-2))] hover:text-[rgb(var(--color-primary-3))]"
  }`;
}

function AccountLayout() {
  const { t } = useTranslation();
  const { user } = useUser();

  function capitalize(word) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  return (
    <div className="mt-17 box-border w-full min-w-0 px-4 py-8 md:px-8 lg:px-12 xl:px-20">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-8 md:gap-10">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 text-sm md:text-base">
            <span className="text-[rgb(var(--color-text-main-2))]">
              <Link to="/">{t("contact.home")}</Link> /
            </span>
            <span className="ml-1 text-[rgb(var(--color-text-main))]">
              {t("myAccount.account")}
            </span>
          </div>
          <p className="shrink-0 text-sm text-[rgb(var(--color-text-main))] md:text-base">
            Welcome!{" "}
            <span className="text-[rgb(var(--color-primary-main))]">
              {capitalize(user?.attributes.firstName)} {capitalize(user?.attributes.lastName)}
            </span>
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          <aside className="w-full min-w-0 shrink-0 lg:w-56 xl:w-62.5">
            <nav
              aria-label="Account"
              className="flex flex-wrap items-center gap-2 border-b border-[rgb(var(--color-border))] pb-4 lg:flex-col lg:items-stretch lg:gap-8 lg:border-b-0 lg:pb-0"
            >
              <p className="hidden w-full text-base font-medium text-[rgb(var(--color-text-main))] lg:block md:text-lg">
                Manage My Account
              </p>
              <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2 lg:flex-col lg:items-stretch lg:gap-2 lg:pl-6">
                <NavLink
                  to="/account/profile"
                  className={({ isActive }) => navClass(isActive)}
                >
                  My Profile
                </NavLink>
                <NavLink
                  to="/account/address"
                  className={({ isActive }) => navClass(isActive)}
                >
                  Address Book
                </NavLink>
              </div>

              <div
                className="hidden h-6 w-px shrink-0 bg-[rgb(var(--color-border))] sm:block lg:hidden"
                aria-hidden
              />

              <p className="hidden w-full text-base font-medium text-[rgb(var(--color-text-main))] lg:block md:text-lg">
                My Orders
              </p>
              <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2 lg:flex-col lg:items-stretch lg:gap-2 lg:pl-6">
                <NavLink
                  to="/account/progress"
                  className={({ isActive }) => navClass(isActive)}
                >
                  In Progress
                </NavLink>
                <NavLink
                  to="/account/arrived"
                  className={({ isActive }) => navClass(isActive)}
                >
                  Arrived
                </NavLink>
                <NavLink
                  to="/account/canceled"
                  className={({ isActive }) => navClass(isActive)}
                >
                  Canceled
                </NavLink>
              </div>
            </nav>
          </aside>

          <div className="min-w-0 flex-1 overflow-x-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;
