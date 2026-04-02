/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useLoaderData } from "react-router-dom";
import { ProductProvider } from "../features/products/ProductContext";

import ProductList from "../features/products/ProductList";
import Filters from "../features/products/filters/Filters";
import CategoryMenu from "../features/categories/CategoryMenu";

function ProductsPage() {
  const { categories, products, totalPages } = useLoaderData();

  return (
    <ProductProvider initialTotalPages={totalPages}>
      <CategoryMenu categories={categories} />
      <div className="mx-auto w-full min-w-0 max-w-[1240px] px-5 py-8 md:px-10">
        <Filters />
        <ProductList initialProducts={products} />
      </div>
    </ProductProvider>
  );
}

export default ProductsPage;
