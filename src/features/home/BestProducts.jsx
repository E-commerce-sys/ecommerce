import CartItemSummary from "../cart/CartSummary";
import Button from "../../components/Button";

function BestProducts({ data }) {
  // shuffle randomly and take 3
  // eslint-disable-next-line react-hooks/purity
  const products = [...data].sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <section className="flex justify-center py-12">
      <div className="flex flex-col gap-2 md:gap-8">
        {/* Header */}
        <div className="flex justify-between mx-5 items-center">
          <div className="flex flex-col gap-2 md:gap-5">
            <div className="flex items-center gap-2 md:gap-4">
              <span className="w-3 h-6 md:w-4 md:h-7 lg:w-5 lg:h-8 bg-[rgb(var(--color-primary-main))] rounded-sm"></span>
              <span className="text-[rgb(var(--color-primary-main))] font-medium text-sm md:text-base">
                This Month
              </span>
            </div>

            <p className="text-[20px] md:text-2xl lg:text-3xl font-semibold">
              Best Selling Products
            </p>
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
              className="w-full aspect-square"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestProducts;
