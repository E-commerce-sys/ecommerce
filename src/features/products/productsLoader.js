import { categoriesAPI } from "../categories/categoriesAPI";
import { productsAPI, productsPage } from "../products/productAPI";

export async function productsLoader() {
  const [categories, products, meta] = await Promise.all([
    categoriesAPI(),
    productsAPI(1),
    productsPage(),
  ]);

  return {
    categories,
    products,
    totalPages: meta.last_page,
  };
}
