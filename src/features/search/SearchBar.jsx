import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";

import search from "../../assets/icons/search.svg";

function readProductsSearchQuery(pathname, search) {
  if (pathname !== "/products") return "";
  return new URLSearchParams(search).get("search") || "";
}

function SearchBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // const urlSearch = useMemo(
  //   () => readProductsSearchQuery(location.pathname, location.search),
  //   [location.pathname, location.search],
  // );

  // const [value, setValue] = useState(urlSearch);
  // const [debouncedValue, setDebouncedValue] = useState(urlSearch);

  // // On /products: mirror ?search= in the input. Elsewhere: empty bar (avoid hijacking other routes).
  // useEffect(() => {
  //   if (location.pathname !== "/products") {
  //     setValue("");
  //     setDebouncedValue("");
  //     return;
  //   }
  //   const q = readProductsSearchQuery(location.pathname, location.search);
  //   setValue(q);
  //   setDebouncedValue(q);
  // }, [location.pathname, location.search]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDebouncedValue(value);
  //   }, 800);

  //   return () => clearTimeout(timer);
  // }, [value]);

  // const skipFirstNavigation = useRef(true);

  // useEffect(() => {
  //   const val = debouncedValue.trim();
  //   const onProducts = location.pathname === "/products";
  //   const hasSearchParam = Boolean(
  //     readProductsSearchQuery(location.pathname, location.search),
  //   );

  //   if (skipFirstNavigation.current) {
  //     skipFirstNavigation.current = false;
  //     if (val === "") return;
  //     navigate(`/search?search=${encodeURIComponent(val)}`, { replace: true });
  //     return;
  //   }

  //   if (val === "") {
  //     if (onProducts && hasSearchParam) {
  //       navigate("/search", { replace: true });
  //     }
  //     return;
  //   }

  //   navigate(`/search?search=${encodeURIComponent(val)}`, { replace: true });
  // }, [debouncedValue, navigate, location.pathname, location.search]);

  // function handleChange(e) {
  //   setValue(e.target.value);
  // }

  const [value, setValue] = useState("");

  // Sync input with URL when on /search
  useEffect(() => {
    const q = readProductsSearchQuery(location.pathname, location.search);
    setValue(q);
  }, [location.pathname, location.search]);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      const trimmed = value.trim();

      if (trimmed === "") {
        navigate("/search");
        return;
      }

      navigate(`/search?search=${encodeURIComponent(trimmed)}`);
    }
  }
  return (
    <div className="relative mx-auto w-full max-w-[520px] min-w-0">
      <img
        src={search}
        alt="search"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60"
      />

      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={t("navbar.search")}
        className="
          w-full
          min-w-0
          max-w-full
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
