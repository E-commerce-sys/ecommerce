import ProductList from "../features/products/ProductList";
import PriceFilter from "../features/products/filters/PriceFilter";

function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <PriceFilter/>
      <ProductList />
    </div>
  );
}

export default ProductsPage;
