import { createContext, useContext, useEffect, useState } from "react";
import { loadCategoryTree } from "../features/categories/loadCategoryTree";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { categories: cats, subCategories: subs } =
          await loadCategoryTree();
        if (!cancelled) {
          setCategories(cats);
          setSubCategories(subs);
        }
      } catch (e) {
        console.error("Failed to load categories", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
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
