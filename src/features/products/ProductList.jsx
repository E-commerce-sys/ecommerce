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
        <div className="flex justify-between mx-5 items-center">
          <div className="flex flex-col gap-2 md:gap-5">
            <h2 className="text-[20px] md:text-2xl lg:text-3xl font-semibold">
              Products
            </h2>
          </div>
        </div>

        {/* Products row with arrows */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            className="flex items-center shrink-0"
            disabled={page === 1}
          >
            <img src={Arrow} className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center hover:bg-[rgb(var(--color-border))]  transition-colors"/>
            <span className='px-2'>Prev</span>
          </button>

          <div className="flex md:gap-8 justify-start flex-wrap w-full">
          {products.map((product) => (
            <div key={product.id} className="w-[calc(33.33%-2rem)]">
              <CartItemSummary
                product={product}
                className={"w-full aspect-square"}
              />
            </div>
          ))}
        </div>

          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            className="flex items-center shrink-0"
            disabled={page === totalPages}
          >
            <span className='px-2'>Next</span>
            <img src={Arrow} className='scale-x-[-1] w-8 h-8 rounded-full shrink-0 flex items-center justify-center hover:bg-[rgb(var(--color-border))]  transition-colors' />
          </button>
        </div>

        <Pagination current={page} setCurrent={setPage} />
      </div>
    </section>
  );
}

export default ProductList;