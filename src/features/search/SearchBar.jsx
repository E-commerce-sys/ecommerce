import search from "../../assets/icons/search-Icon.svg";

function SearchBar() {
  return (
    <div className="relative w-150">
      <img
        src={search}
        alt="search"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60"
      />

      <input
        type="text"
        placeholder="Search for products . . ."
        className="
          w-full
          pl-10
          pr-4
          py-2
          rounded-sm
          bg-gray-100
          text-normal
          outline-none
          placeholder:text-gray-500
          focus:ring-1
          focus:ring-[rgb(var(--color-primary-main))]
        "
      />
    </div>
  );
}

export default SearchBar;
