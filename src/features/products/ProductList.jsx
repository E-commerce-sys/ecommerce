/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useProductContext } from "./ProductContext";
import { useProductFilters } from "./useProductFilters";

import CartItemSummary from "../../features/cart/CartSummary";
import Pagination from "./Pagination";
import { filtersAPI } from "./filters/filtersAPI";
import { useTranslation } from "react-i18next";

function ProductList({ initialProducts = [] }) {
  const { t } = useTranslation();

  const [products, setProducts] = useState(initialProducts);
  const { setTotalPages } = useProductContext();
  const { filters } = useProductFilters();

  const {
    page = 1,
    search = "",
    hasDiscount = false,
    minPrice = 0,
    maxPrice = 5000,
    ratingSort = null,
    priceSort = null,
    bestSelling = false,
    discount = null,
    category
  } = filters;

  useEffect(() => {
    async function fetchProducts() {
      const { data, meta } = await filtersAPI(
        page,
        search,
        hasDiscount,
        minPrice,
        maxPrice,
        ratingSort,
        bestSelling,
        priceSort,
        discount,
        category
      );

      setProducts(data ?? []);
      setTotalPages(meta.last_page);

      window.scrollTo(0, 0);
    }

    fetchProducts();
  }, [
    page,
    search,
    hasDiscount,
    minPrice,
    maxPrice,
    ratingSort,
    priceSort,
    bestSelling,
    discount,
    category
  ]);

  return (
    <section className="flex w-full min-w-0 flex-wrap justify-center overflow-x-hidden py-12">
      <div className="flex w-full min-w-0 flex-col gap-2 md:gap-8">
        <div className="grid w-full min-w-0 max-w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-3 xl:grid-cols-4">
          {products.length === 0 ? (
            <div className="col-span-full flex w-full flex-col items-center justify-center py-20 text-center">
              <p className="text-xl font-semibold text-[rgb(var(--color-text-main))]">
                {t("products.noProduct")}
              </p>

              <p className="text-[rgb(var(--color-text-main-1))] mt-2">
                {t("products.try")}
              </p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="min-w-0">
                <CartItemSummary
                  product={product}
                  wrapperClassName="flex w-full min-w-0 flex-col gap-3 m-0"
                  className="aspect-square w-full min-w-0"
                />
              </div>
            ))
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          <Pagination />
        </div>
      </div>
    </section>
  );
}

export default ProductList;
