/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState } from "react";

function SubCategoryMenu({ subCategories }) {
  const [activeSub, setActiveSub] = useState(null);

  return (
    <div className="flex gap-2 px-6 py-4 overflow-x-auto">
      {subCategories.map((sub) => (
        <div
          key={sub.id}
          onClick={() => setActiveSub(sub.id)}
          className="flex flex-col items-center min-w-22.5 cursor-pointer"
        >
          <div
            className={`w-12 h-12 rounded-full border border-[rgb(var(--color-text-main))] flex items-center justify-center  ${
              activeSub === sub.id
                ? "shadow-sm shadow-[rgb(var(--color-primary-3))]"
                : "hover:shadow-md"
            }`}
          >
            <img src={sub.icon} alt={sub.name} className="w-7 h-7" />
          </div>

          <p className="text-xs text-center mt-2">{sub.name}</p>
        </div>
      ))}
    </div>
  );
}

export default SubCategoryMenu;
