import { productsAPI, productsPage } from './productAPI'
import { useState, useEffect } from 'react';
import CartItemSummary from "../../features/cart/CartSummary";
import Pagination from './Pagination';
import Arrow from '../../assets/icons/icons-arrow-left.svg'

function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      const res = await productsAPI(page);
      setProducts(res);
      window.scrollTo(0, 0);
    }
    fetchProducts();
  }, [page]);

  useEffect(() => {
    async function fetchTotal() {
      const meta = await productsPage();
      setTotalPages(meta.last_page);
    }
    fetchTotal();
  }, []);

 return (
  <section className="flex justify-center py-12 flex-wrap">
    <div className="flex flex-col gap-2 md:gap-8 w-full">

      {/* Products grid */}
      <div className="flex flex-wrap gap-4 md:gap-8 justify-start w-full px-4">
        {products.map((product) => (
          <div key={product.id} className="w-[calc(50%-0.5rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(33.33%-2rem)]">
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            className="hidden md:flex items-center shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={page === 1}
          >
            <img src={Arrow} className="w-8 h-8 rounded-full hover:bg-[rgb(var(--color-border))] transition-colors" />
            <span className="px-2">Prev</span>
          </button>

          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            className=" hidden md:flex items-center shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={page === totalPages}
          >
            <span className="px-2">Next</span>
            <img src={Arrow} className="scale-x-[-1] w-8 h-8 rounded-full hover:bg-[rgb(var(--color-border))] transition-colors" />
          </button>
        </div>
      </div>

    </div>
  </section>
);
}

export default ProductList;