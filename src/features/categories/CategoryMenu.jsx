import { useState } from "react";
import { categories } from "../../mock/categories";
import SubCategoryMenu from "./SubCategoryMenu";

import menu from "../../assets/icons/menu.svg";

function CategoryMenu() {
  const parentCategories = categories.filter((cat) => cat.parent_id === null);
  const [activeCategory, setActiveCategory] = useState(parentCategories[0]);

  return (
    <div className="w-full">
      {/* Parent categories */}
      <div className="flex gap-10 px-6 py-3 border-b border-[rgb(var(--color-text-main-2))] overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-2 font-semibold text-[rgb(var(--color-text-main-3))] ">
          <img src={menu} alt="" />
          <p>Categories </p>
        </div>
        <div className="flex gap-6">
          {parentCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={`pb-2 text-sm font-medium cursor-pointer ${
                activeCategory.id === cat.id
                  ? "border-b-2 border-[rgb(var(--color-primary-main))] text-[rgb(var(--color-primary-main))] "
                  : "text-[rgb(var(--color-text-main-3))] "
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      <SubCategoryMenu parentId={activeCategory.id} />
    </div>
  );
}

export default CategoryMenu;

// import { useEffect, useState } from "react";
// import SubCategoryMenu from "./SubCategoryMenu";

// function CategoryMenu() {
//   const [categories, setCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(null);

//   useEffect(() => {
//     fetch("/api/categories/parents")
//       .then((res) => res.json())
//       .then((data) => {
//         setCategories(data);
//         setActiveCategory(data[0]); // default first category
//       });
//   }, []);

//   return (
//     <div className="w-full">
//       {/* Parent Categories */}
//       <div className="flex gap-6 border-b px-6 py-3">
//         {categories.map((cat) => (
//           <button
//             key={cat.id}
//             onClick={() => setActiveCategory(cat)}
//             className={`text-sm font-medium pb-2 ${
//               activeCategory?.id === cat.id
//                 ? "border-b-2 border-orange-500 text-orange-500"
//                 : "text-gray-600"
//             }`}
//           >
//             {cat.name}
//           </button>
//         ))}
//       </div>

//       {/* Subcategories */}
//       {activeCategory && <SubCategoryMenu parentId={activeCategory.id} />}
//     </div>
//   );
// }

// export default CategoryMenu;
