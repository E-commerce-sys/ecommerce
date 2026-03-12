import { useState, useEffect } from "react";
import { useProductContext } from "./ProductContext";
import CartItemSummary from "../../features/cart/CartSummary";
import Pagination from "./Pagination";
import Arrow from "../../assets/icons/icons-arrow-left.svg";
import {filtersAPI} from './filters/filtersAPI'
import { useLocation } from "react-router-dom";
import {bestProductAPI} from '../home/API/bestProduct'

function ProductList() {
  const [products, setProducts] = useState([]);
  const { isDiscounted, minPrice, maxPrice, page, setPage, setTotalPages, totalPages, ratingSort} = useProductContext();
  const location = useLocation();
  const isBestSelling = location.state?.isBestSelling ?? false;

//   useEffect(() => {
//   async function fetchProducts() {

//     const { data, meta } = await filtersAPI(page, isDiscounted, minPrice, maxPrice, ratingSort);
//     setProducts(data ?? []);
//     setTotalPages(meta.last_page);

//     window.scrollTo(0, 0);
//   }
//   fetchProducts();
// }, [page, isDiscounted, minPrice, maxPrice,ratingSort]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, meta } = await filtersAPI(page, isDiscounted, minPrice, maxPrice, ratingSort, isBestSelling);
      
      setProducts(data ?? []);
      setTotalPages(meta.last_page);
      window.scrollTo(0, 0);
    }
    fetchProducts();
  }, [page, isDiscounted, minPrice, maxPrice, ratingSort, isBestSelling]);

  return (
    <section className="flex justify-center py-12 flex-wrap">
      <div className="flex flex-col gap-2 md:gap-8 w-full">
        {/* Products grid */}
        <div className="flex flex-wrap gap-4 md:gap-8 justify-start w-full px-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[calc(50%-0.5rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(33.33%-2rem)]"
            >
              <CartItemSummary
                product={product}
                className={"w-full aspect-square"}
              />
            </div>
          ))}
        </div>

        {/* Prev / Next + Pagination */}
        <div className="flex flex-col items-center gap-4 px-4">
          <Pagination current={page} setCurrent={setPage} />

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="flex items-center shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={page === 1}
            >
              <img
                src={Arrow}
                className="w-7 h-7 rounded-full hover:bg-[rgb(var(--color-border))] transition-colors"
              />
              <span className="px-2">Prev</span>
            </button>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="flex items-center shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={page === totalPages}
            >
              <span className="px-2">Next</span>
              <img
                src={Arrow}
                className="scale-x-[-1] w-7 h-7 rounded-full hover:bg-[rgb(var(--color-border))] transition-colors cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductList;
