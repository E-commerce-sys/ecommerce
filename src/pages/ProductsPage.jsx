import ProductList from "../features/products/ProductList";
import ProductFilters from "../features/products/ProductFilters";

function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <ProductFilters />
      <ProductList />
    </div>
  );
}

export default ProductsPage;
