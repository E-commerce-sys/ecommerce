/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AccountLayout() {
  const { t } = useTranslation();
  const { user } = useAuth();
  function capitalize(word) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  return (
    <div className="flex flex-col gap-10 mt-17 px-4 md:px-10 lg:px-20 py-10 w-full">
      <div className="flex justify-between items-center w-full">
        <div>
          <span className="text-[rgb(var(--color-text-main-2))]">
            <Link to="/">{t("contact.home")}</Link> /
          </span>
          <span className="text-[rgb(var(--color-text-main))] ml-1">
            {t("myAccount.account")}
          </span>
        </div>{" "}
        <div>
          <p>
            Welcome!{" "}
            <span className="text-[rgb(var(--color-primary-main))]">
              {capitalize(user?.first_name)} {capitalize(user?.last_name)}
            </span>
          </p>
        </div>
      </div>

      <div className="flex felx-col gap-15">
        {" "}
        <aside className="flex flex-col gap-15 w-62.5">
          <nav className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-[18px] font-medium text-[rgb(var(--color-text-main))]">
                Manage My Account
              </p>
              <div className="flex flex-col gap-2 mx-6">
                <NavLink
                  to="/account/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[rgb(var(--color-primary-main))]"
                      : "text-[rgb(var(--color-text-main-2))]"
                  }
                >
                  My Profile
                </NavLink>
                <NavLink
                  to="/account/address"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[rgb(var(--color-primary-main))]"
                      : "text-[rgb(var(--color-text-main-2))]"
                  }
                >
                  Address Book
                </NavLink>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[18px] font-medium text-[rgb(var(--color-text-main))]">
                My Orders
              </p>
              <div className="flex flex-col mx-6">
                <NavLink
                  to="/account/progress"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[rgb(var(--color-primary-main))]"
                      : "text-[rgb(var(--color-text-main-2))]"
                  }
                >
                  In Progress
                </NavLink>
                <NavLink
                  to="/account/arrived"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[rgb(var(--color-primary-main))]"
                      : "text-[rgb(var(--color-text-main-2))]"
                  }
                >
                  Arrived
                </NavLink>
                <NavLink
                  to="/account/canceled"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[rgb(var(--color-primary-main))]"
                      : "text-[rgb(var(--color-text-main-2))]"
                  }
                >
                  Canceled
                </NavLink>
              </div>
            </div>
          </nav>
        </aside>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;
