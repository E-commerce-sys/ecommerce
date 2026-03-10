import Pagination from "../features/products/Pagination";
import ProductList from "../features/products/ProductList";
import DiscountFilter from "../features/products/filters/DiscountFilter";
import PriceFilters from "../features/products/filters/PriceFilter";
import RatingFilter from "../features/products/filters/RatingFilter";

function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-6 items-center">
      <h1>Filter</h1>  
      <PriceFilters/>
      <DiscountFilter/>
      <RatingFilter/>
      </div>
      <ProductList />
      <Pagination/>
    </div>
  );
}

export default ProductsPage;
