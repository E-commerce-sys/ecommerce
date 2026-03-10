import CategoryMenu from "../features/categories/CategoryMenu";
import BestProducts from "../features/home/BestProducts";
import FeaturedProducts from "../features/home/FeaturedProducts";

function HomePage() {
  return (
    <div className="mt-17">
      <CategoryMenu />
      <BestProducts />
      <FeaturedProducts />
    </div>
  );
}

export default HomePage;
