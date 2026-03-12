// import { useLoaderData } from "react-router-dom";
// import ProductList from "../features/products/ProductList";
// import Filters from "../features/products/filters/Filters";
// import CategoryMenu from "../features/categories/CategoryMenu";

// function ProductsPage() {
//   const { categories, products, totalPages } = useLoaderData();

//   return (
//     <div className="w-full px-4 md:px-8 py-8 mt-17">
//       <CategoryMenu categories={categories} />
//       <Filters />
//       <ProductList data={products} totalPages={totalPages} />
//     </div>
//   );
// }

// export default ProductsPage;

import { ProductProvider } from "../features/products/ProductContext";
import ProductList from "../features/products/ProductList";
import Filters from "../features/products/filters/Filters";
import CategoryMenu from "../features/categories/CategoryMenu";

function ProductsPage() {
  return (
    <ProductProvider>
      <div className="w-full px-4 md:px-8 py-8 mt-17">
        {/* <CategoryMenu /> */}
        <Filters />
        <ProductList />
      </div>
    </ProductProvider>
  );
}

export default ProductsPage;