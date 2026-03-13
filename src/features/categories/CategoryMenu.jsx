/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import SubCategoryMenu from "./SubCategoryMenu";
import { subCategoriesAPI } from "./subCategoriesAPI";
import menu from "../../assets/icons/menu.svg";
import { useTranslation } from "react-i18next";

function CategoryMenu({ categories }) {
  const { i18n, t } = useTranslation();

  const [activeCategoryId, setActiveCategoryId] = useState();
  const [subCategories, setSubCategories] = useState([]);

  // Normalize category names based on language
  const normalizedCategories = categories.map((cat) => ({
    id: cat.id,
    name:
      i18n.language === "ar"
        ? cat.attributes.nameAr
        : i18n.language === "ku"
          ? cat.attributes.nameKu
          : cat.attributes.nameEn,
    icon: cat.attributes.icon,
  }));

  // Set default active category
  useEffect(() => {
    if (normalizedCategories.length > 0) {
      setActiveCategoryId(normalizedCategories[0].id);
    }
  }, [categories]);

  // Fetch subcategories when category changes
  useEffect(() => {
    async function fetchSubCategories() {
      if (!activeCategoryId) return;

      try {
        const subs = await subCategoriesAPI(activeCategoryId);

        const normalized = subs.map((sub) => ({
          id: sub.id,
          name:
            i18n.language === "ar"
              ? sub.attributes.nameAr
              : i18n.language === "ku"
                ? sub.attributes.nameKu
                : sub.attributes.nameEn,
          icon: sub.attributes.icon,
        }));

        setSubCategories(normalized);
      } catch (err) {
        console.error("Failed to fetch subcategories:", err);
      }
    }

    fetchSubCategories();
  }, [activeCategoryId, i18n.language]);

  return (
    <div className="w-full">
      {/* Parent categories */}
      <div className="flex gap-10 mt-17 px-6 py-3 border-b border-[rgb(var(--color-text-main-2))] overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-2 font-semibold text-[rgb(var(--color-text-main-3))]">
          <img src={menu} alt="" />
          <p>{t("category")}</p>
        </div>

        <div className="flex gap-6">
          {normalizedCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={` text-sm font-medium cursor-pointer ${
                activeCategoryId === cat.id
                  ? "border-b-2 pb-2 border-[rgb(var(--color-primary-main))] text-[rgb(var(--color-primary-main))]"
                  : "text-[rgb(var(--color-text-main-3))] hover:text-[rgb(var(--color-primary-3))]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      <SubCategoryMenu subCategories={subCategories} />
    </div>
  );
}

export default CategoryMenu;
