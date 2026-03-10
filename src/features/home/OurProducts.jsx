import CartItemSummary from "../../features/cart/CartSummary";
import Button from "../../components/Button";
import { productsAPI } from "./productAPI";
import { useEffect, useState } from "react";
function OurProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await productsAPI();
      console.log(res);
      const featuredProducts = res.filter(
        (product) => product.attributes.isFeatured === true,
      );

      // shuffle randomly
      const randomThree = [...featuredProducts]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);

      setProducts(randomThree);
    }

    fetchProducts();
  }, []);

  return (
    <section className="flex justify-center py-12">
      <div className="flex flex-col gap-2 md:gap-8">
        {/* Header */}
        <div className="flex justify-between mx-5 md:mx-10 items-center">
          <div className="flex flex-col gap-2 md:gap-5">
            <div className="flex items-center gap-2 md:gap-4">
              <span className="w-3 h-6 bg-[rgb(var(--color-primary-main))] rounded-sm"></span>
              <span className="text-[rgb(var(--color-primary-main))] font-medium text-sm md:text-base">
                Our Products
              </span>
            </div>

            <h2 className="text-[20px] md:text-2xl lg:text-3xl font-semibold">
              Explore Our Products
            </h2>
          </div>

          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-2 px-5">
          {products.map((product) => (
            <CartItemSummary
              key={product.id}
              product={product}
              className={"w-full aspect-square lg:w-[270px] lg:h-[270px]"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurProducts;
