import { useLoaderData } from "react-router-dom";
import { ProductProvider } from "../features/products/ProductContext";

import ProductList from "../features/products/ProductList";
import Filters from "../features/products/filters/Filters";
import CategoryMenu from "../features/categories/CategoryMenu";

function ProductsPage() {
  const { categories, products, totalPages } = useLoaderData();

  return (
    <ProductProvider initialTotalPages={totalPages}>
      <div className="w-full px-4 md:px-8 py-8 mt-17">
        <CategoryMenu categories={categories} />
        <Filters />
        <ProductList initialProducts={products} />
      </div>
    </ProductProvider>
  );
}

export default ProductsPage;
