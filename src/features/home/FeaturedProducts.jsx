import CartItemSummary from "../../features/cart/CartSummary";
import Button from "../../components/Button";
import { productsAPI } from "./productAPI";
import { useEffect, useState } from "react";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await productsAPI();

      const bestSellingProducts = res.filter(
        (product) => product.attributes.isBestSelling === true,
      );

      // shuffle randomly
      const randomThree = [...bestSellingProducts]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      setProducts(randomThree);
    }

    fetchProducts();
  }, []);

  return (
    <section className="flex justify-center py-12">
      <div className="flex flex-col gap-2 md:gap-8">
        {/* Header */}
        <div className="flex justify-between mx-5 items-center">
          <div className="flex flex-col gap-2 md:gap-5">
            <div className="flex items-center gap-2 md:gap-4">
              <span className="w-3 h-6 bg-[rgb(var(--color-primary-main))] rounded-sm"></span>
              <span className="text-[rgb(var(--color-primary-main))] font-medium text-sm md:text-base">
                This Month
              </span>
            </div>

            <h2 className="text-[20px] md:text-2xl lg:text-3xl font-semibold">
              Best Selling Products
            </h2>
          </div>

          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        {/* Products */}
        <div className="flex md:gap-16 justify-between">
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

export default FeaturedProducts;
