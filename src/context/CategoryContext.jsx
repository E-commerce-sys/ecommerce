/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { categoriesAPI } from "../features/categories/categoriesAPI";
import { subCategoriesAPI } from "../features/categories/subCategoriesAPI";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      const cats = await categoriesAPI();
      setCategories(cats);

      const subsMap = {};

      for (const cat of cats) {
        const subs = await subCategoriesAPI(cat.id);
        subsMap[cat.id] = subs;
      }

      setSubCategories(subsMap);

      setLoading(false);
    }

    loadCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, subCategories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoryContext);
}
