import { useState, useEffect } from "react";
import SubCategoryMenu from "./SubCategoryMenu";
import { categoriesAPI } from "./categoriesAPI";
import menu from "../../assets/icons/menu.svg";
import { useTranslation } from "react-i18next";

function CategoryMenu() {
  const { i18n } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await categoriesAPI();
        console.log(res);
        const normalized = res.data.map((cat) => ({
          id: cat.id,
          name:
            i18n.language === "ar"
              ? cat.attributes.nameAr
              : i18n.language === "ku"
                ? cat.attributes.nameKu
                : cat.attributes.nameEn,
          icon: cat.attributes.icon,
          parent_id: cat.included?.parent?.id ?? null,
        }));

        setCategories(normalized);

        const parents = normalized.filter((c) => c.parent_id === null);
        setActiveCategory(parents[0]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    fetchCategories();
  }, [i18n.language]);

  const parentCategories = categories.filter((cat) => cat.parent_id === null);

  if (!activeCategory) return null;

  return (
    <div className="w-full">
      {/* Parent categories */}
      <div className="flex gap-10 px-6 py-3 border-b border-[rgb(var(--color-text-main-2))] overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-2 font-semibold text-[rgb(var(--color-text-main-3))]">
          <img src={menu} alt="" />
          <p>Categories</p>
        </div>

        <div className="flex gap-6">
          {parentCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={`pb-2 text-sm font-medium cursor-pointer ${
                activeCategory.id === cat.id
                  ? "border-b-2 border-[rgb(var(--color-primary-main))] text-[rgb(var(--color-primary-main))]"
                  : "text-[rgb(var(--color-text-main-3))]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      <SubCategoryMenu parentId={activeCategory.id} categories={categories} />
    </div>
  );
}

export default CategoryMenu;
