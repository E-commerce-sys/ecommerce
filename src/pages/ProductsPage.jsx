import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ProductProvider } from "../features/products/ProductContext";
import { useProductFilters } from "../features/products/useProductFilters";
import { filtersAPI } from "../features/products/filters/filtersAPI";

import ProductList from "../features/products/ProductList";
import Filters from "../features/products/filters/Filters";
import CategoryMenu from "../features/categories/CategoryMenu";

function ProductsPage() {
  const { filters } = useProductFilters();

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "products",
      filters.page,
      filters.search,
      filters.hasDiscount,
      filters.minPrice,
      filters.maxPrice,
      filters.ratingSort,
      filters.bestSelling,
      filters.priceSort,
      filters.discount,
      filters.category,
    ],
    queryFn: () =>
      filtersAPI(
        filters.page,
        filters.search,
        filters.hasDiscount,
        filters.minPrice,
        filters.maxPrice,
        filters.ratingSort,
        filters.bestSelling,
        filters.priceSort,
        filters.discount,
        filters.category,
      ),
    placeholderData: keepPreviousData,
  });

  const products = data?.data || [];
  const totalPages = data?.meta?.last_page || 1;

  return (
    <ProductProvider initialTotalPages={totalPages}>
      <CategoryMenu />
      <div className="mx-auto w-full min-w-0 max-w-[1240px] px-5 py-8 md:px-10">
        <Filters />
        {isLoading ? (
          <p className="mt-10 text-center text-sm text-[rgb(var(--color-text-main-3))]">
            Loading...
          </p>
        ) : null}
        {isError ? (
          <p className="mt-10 text-center text-sm text-red-500">
            Failed to load products.
          </p>
        ) : null}
        {!isLoading && !isError ? <ProductList products={products} /> : null}
      </div>
    </ProductProvider>
  );
}

export default ProductsPage;
