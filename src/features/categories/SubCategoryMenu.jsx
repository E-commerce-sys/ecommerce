import { useState } from "react";
import { categories } from "../../mock/categories";

function SubCategoryMenu({ parentId }) {
  const subCategories = categories.filter((cat) => cat.parent_id === parentId);
  const [activeSub, setActiveSub] = useState(null);

  return (
    <div className="flex gap-6 px-6 py-4 overflow-x-auto">
      {subCategories.map((sub) => (
        <div
          key={sub.id}
          onClick={() => setActiveSub(sub.id)}
          className="flex flex-col items-center min-w-22.5 cursor-pointer"
        >
          <div
            className={`w-12 h-12 rounded-full border border-[rgb(var(--color-text-main))] flex items-center justify-center transition-all duration-200 ${
              activeSub === sub.id
                ? "shadow-md shadow-[rgb(var(--color-primary-main))] mb-1"
                : "hover:shadow-md hover:shadow-[rgb(var(--color-primary-main-2))]"
            }`}
          >
            <img
              src={sub.icon_url}
              alt={sub.name}
              className="w-7 h-7 object-contain"
            />
          </div>

          <p className="text-xs text-center mt-2">{sub.name}</p>
        </div>
      ))}
    </div>
  );
}

export default SubCategoryMenu;

// import { useEffect, useState } from "react";

// function SubCategoryMenu({ parentId }) {
//   const [subCategories, setSubCategories] = useState([]);

//   useEffect(() => {
//     fetch(`/api/categories/sub?parent_id=${parentId}`)
//       .then((res) => res.json())
//       .then((data) => setSubCategories(data));
//   }, [parentId]);

//   return (
//     <div className="flex gap-6 px-6 py-4 overflow-x-auto">
//       {subCategories.map((sub) => (
//         <div
//           key={sub.id}
//           className="flex flex-col items-center min-w-[90px] cursor-pointer"
//         >
//           <div className="w-16 h-16 rounded-full border flex items-center justify-center hover:shadow-md transition">
//             <img
//               src={sub.icon_url}
//               alt={sub.name}
//               className="w-8 h-8 object-contain"
//             />
//           </div>

//           <p className="text-xs text-center mt-2">{sub.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
// export default SubCategoryMenu;
