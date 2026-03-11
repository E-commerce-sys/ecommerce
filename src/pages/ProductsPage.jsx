import Pagination from "../features/products/Pagination";
import ProductList from "../features/products/ProductList";
import DiscountFilter from "../features/products/filters/DiscountFilter";
import PriceFilters from "../features/products/filters/PriceFilter";
import RatingFilter from "../features/products/filters/RatingFilter";
import CategoryMenu from "../features/categories/CategoryMenu"

function ProductsPage() {
  return (
    <div className="container mx-auto py-8 mt-17">
      <CategoryMenu/>
      <div className="flex gap-6 items-center">
        <h1 className="font-semibold text-[24px]">Filter</h1>
        <PriceFilters />
        <DiscountFilter />
        <RatingFilter />
      </div>
      <ProductList />
    </div>
  );
}

export default ProductsPage;
