import ProductList from "../features/products/ProductList";
import Filters from "../features/products/filters/Filters";
import CategoryMenu from "../features/categories/CategoryMenu"

function ProductsPage() {
  return (
    <div className="w-full px-4 md:px-8 py-8 mt-17">
      <CategoryMenu />
      <Filters />
      <ProductList />
    </div>
  );
}

export default ProductsPage;
