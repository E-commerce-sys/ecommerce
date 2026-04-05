import { categoriesAPI } from "./categoriesAPI";
import { subCategoriesAPI } from "./subCategoriesAPI";

let cache = null;
let inflight = null;

/**
 * Single-flight load for categories + subcategories.
 * Caches result and shares one in-flight promise so StrictMode double-mount
 * and concurrent callers do not duplicate network requests.
 */
export async function loadCategoryTree() {
  if (cache) return cache;
  if (!inflight) {
    inflight = (async () => {
      const categories = await categoriesAPI();
      const subCategories = Object.fromEntries(
        await Promise.all(
          categories.map(async (cat) => {
            const subs = await subCategoriesAPI(cat.id);
            return [cat.id, subs];
          }),
        ),
      );
      return { categories, subCategories };
    })();
  }
  try {
    const data = await inflight;
    cache = data;
    return data;
  } finally {
    inflight = null;
  }
}
