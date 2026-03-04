import { NavLink } from "react-router-dom";
import SearchBar from "../features/search/SearchBar";

import heart from "../assets/icons/heart-Icon.svg";
import profile from "../assets/icons/profile-icon.svg";
import basket from "../assets/icons/basket-icon.svg";
import en from "../assets/icons/en.svg";

function Navbar() {
  return (
    <div className="py-3 border-b border-b-[rgb(var(--color-border))]">
      <div className="flex text-lg justify-around items-center text-[rgb(var(--color-text-main))] ">
        {/* Logo */}
        <NavLink to="/">
          <p className="font-bold text-2xl cursor-pointer">Exclusive</p>
        </NavLink>

        {/* Search */}
        <div>
          <SearchBar />
        </div>

        {/* Right Side */}
        <div className="flex justify-between items-center gap-5">
          {/* Language */}
          <div className="cursor-pointer">
            <img src={en} alt="" className="w-6 h-6" />
          </div>

          {/* Basket */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex justify-center items-center gap-1 cursor-pointer ${isActive && "py-1 border-b border-b-[rgb(var(--color-primary-main))] transition-all ease-linear"}`
            }
          >
            <img src={basket} alt="profile-icon" className="w-6 h-6" />
            <p className="text-sm">My basket</p>
          </NavLink>

          {/* Wishlist */}
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `flex justify-center items-center gap-1 cursor-pointer ${isActive && "py-1 border-b border-b-[rgb(var(--color-primary-main))] transition-all ease-linear"}`
            }
          >
            <img src={heart} alt="profile-icon" className="w-6 h-6" />
            <p className="text-sm">My favourites</p>
          </NavLink>

          {/* Login */}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex justify-center items-center gap-1 cursor-pointer ${isActive && "py-1 border-b border-b-[rgb(var(--color-primary-main))] transition-all ease-linear"}`
            }
          >
            <img src={profile} alt="profile-icon" className="w-6 h-6" />
            <p className="text-sm">Log in</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
