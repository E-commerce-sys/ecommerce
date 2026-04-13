import { NavLink, Outlet } from "react-router-dom";

import logo from "../assets/icons/logo.svg";
function AdminLayout() {
  return (
    <div className="flex gap-4 p-3">
      <aside className="flex flex-col gap-6 py-2 border border-[rgb(var(--color-border))] rounded w-[250px]">
        <div className="flex gap-4 p-3 items-center border-b border-[rgb(var(--color-grey))]">
          <img src={logo} alt="" className="w-10 h-10" />
          <p className="text-[20px] font-bold text-[rgb(var(--color-primary-5))]">
            Exclusive
          </p>
        </div>

        <div className="flex flex-col gap-20 text-[rgb(var(--color-text-main))]">
          <div className="flex flex-col gap-10">
            {/* Dashboard */}
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                `px-5 py-1 ${isActive && "bg-[#FBECED] text-[rgb(var(--color-primary-5))] font-medium"}`
              }
            >
              Dashboard
            </NavLink>

            {/* Managment */}
            <div className="flex gap-2 flex-col">
              <p className="text-[rgb(var(--color-text-main-1))] px-2">
                Managment
              </p>
              <div className="flex flex-col gap-2">
                <NavLink
                  to="products"
                  className={({ isActive }) =>
                    `px-5 py-1 ${isActive && "bg-[#FBECED] text-[rgb(var(--color-primary-5))] font-medium"}`
                  }
                >
                  Products
                </NavLink>
                <NavLink
                  to="categories"
                  className={({ isActive }) =>
                    `px-5 py-1 ${isActive && "bg-[#FBECED] text-[rgb(var(--color-primary-5))] font-medium"}`
                  }
                >
                  Categories
                </NavLink>
                <NavLink
                  to="orders"
                  className={({ isActive }) =>
                    `px-5 py-1 ${isActive && "bg-[#FBECED] text-[rgb(var(--color-primary-5))] font-medium"}`
                  }
                >
                  Orders
                </NavLink>
                <NavLink
                  to="users"
                  className={({ isActive }) =>
                    `px-5 py-1 ${isActive && "bg-[#FBECED] text-[rgb(var(--color-primary-5))] font-medium"}`
                  }
                >
                  Users
                </NavLink>
                <NavLink
                  to="staff"
                  className={({ isActive }) =>
                    `px-5 py-1 ${isActive && "bg-[#FBECED] text-[rgb(var(--color-primary-5))] font-medium"}`
                  }
                >
                  Staff{" "}
                </NavLink>
              </div>
            </div>

            {/* Marketing */}
            <div className="flex gap-2 flex-col">
              <p className="text-[rgb(var(--color-text-main-1))] px-2">
                Marketing
              </p>
              <div className="flex flex-col gap-2">
                <NavLink
                  to="coupons"
                  className={({ isActive }) =>
                    `px-5 py-1 ${isActive && "bg-[#FBECED] text-[rgb(var(--color-primary-5))] font-medium"}`
                  }
                >
                  Coupons
                </NavLink>
                <NavLink
                  to="discounts"
                  className={({ isActive }) =>
                    `px-5 py-1 ${isActive && "bg-[#FBECED] text-[rgb(var(--color-primary-5))] font-medium"}`
                  }
                >
                  Discounts
                </NavLink>
              </div>
            </div>

            {/* Content */}
            <div className="flex gap-2 flex-col">
              <p className="text-[rgb(var(--color-text-main-1))] px-2">
                Content
              </p>
              <div className="flex flex-col gap-2">
                <NavLink
                  to="contacts"
                  className={({ isActive }) =>
                    `px-5 py-1 ${isActive && "bg-[#FBECED] text-[rgb(var(--color-primary-5))] font-medium"}`
                  }
                >
                  Contacts
                </NavLink>
              </div>
            </div>

            {/* Analytics */}
            <div className="flex gap-2 flex-col">
              <p className="text-[rgb(var(--color-text-main-1))] px-2">
                Analytics
              </p>
              <div className="flex flex-col gap-2">
                <NavLink
                  to="reports"
                  className={({ isActive }) =>
                    `px-5 py-1 ${isActive && "bg-[#FBECED] text-[rgb(var(--color-primary-5))] font-medium"}`
                  }
                >
                  Reports
                </NavLink>
              </div>
            </div>

            {/* System */}
            <div className="flex gap-2 flex-col">
              <p className="text-[rgb(var(--color-text-main-1))]  px-2">
                System
              </p>
              <div className="flex flex-col gap-2">
                <NavLink
                  to="settings"
                  className={({ isActive }) =>
                    `px-5 py-1 ${isActive && "bg-[#FBECED] text-[rgb(var(--color-primary-5))] font-medium"}`
                  }
                >
                  Settings
                </NavLink>
                <p className="px-5 py-1 cursor-pointer">Log out</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-2">
            <p className="font-medium">User name</p>
            <p className="text-sm">user@gmail.com</p>
          </div>
        </div>
      </aside>
      <div className="flex p-2 border border-[rgb(var(--color-border))] rounded w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
