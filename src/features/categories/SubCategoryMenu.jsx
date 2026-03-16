/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Link, useSearchParams } from "react-router-dom";

function SubCategoryMenu({ subCategories }) {
  const [searchParams] = useSearchParams();
  const activeSub = Number(searchParams.get("category"));

  return (
    <div className="flex gap-2 px-6 py-4 overflow-x-auto">
      {subCategories.map((sub) => (
        <Link
          key={sub.id}
          to={`/products?category=${sub.id}`}
          className="flex flex-col items-center min-w-22.5 cursor-pointer"
        >
          <div
            className={`rounded-full ${
              activeSub === sub.id
                ? "border border-[rgb(var(--color-primary-5))]"
                : ""
            }`}
          >
            <div
              className={`w-12 h-12 m-1 rounded-full border border-[rgb(var(--color-text-main))] flex items-center justify-center  ${
                activeSub === sub.id ? "" : "hover:shadow-md"
              }`}
            >
              <img src={sub.icon} alt={sub.name} className="w-7 h-7" />
            </div>
          </div>

          <p className="text-xs text-center mt-2">{sub.name}</p>
        </Link>
      ))}
    </div>
  );
}

export default SubCategoryMenu;
