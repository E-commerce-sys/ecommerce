import { productsAPI } from "./productAPI";
import { useState, useEffect } from "react";
import CartItemSummary from "../../features/cart/CartSummary";

function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      const res = await productsAPI();

      // shuffle randomly
      const randomProducts = [...res]
        .sort(() => Math.random() - 0.5)
        .slice(0, 15);

      setProducts(randomProducts);
    }

    fetchProducts();
  }, []);

  return (
    <section className="flex justify-center py-12 flex-wrap">
      <div className="flex flex-col gap-2 md:gap-8">
        {/* Header */}
        <div className="flex justify-between mx-5 items-center">
          <div className="flex flex-col gap-2 md:gap-5">
            <h2 className="text-[20px] md:text-2xl lg:text-3xl font-semibold">
              Products
            </h2>
          </div>
        </div>

        {/* Products */}
        <div className="flex md:gap-16 justify-between flex-wrap">
          {products.map((product) => (
            <CartItemSummary
              key={product.id}
              product={product}
              className={"w-full aspect-square"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
