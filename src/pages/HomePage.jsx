import CategoryMenu from "../features/categories/CategoryMenu";
import BestProducts from "../features/home/BestProducts";
import FeaturedProducts from "../features/home/FeaturedProducts";
import NewArrivals from "../features/home//NewArrivals";

function HomePage() {
  return (
    <div className="mt-17">
      <CategoryMenu />
      <BestProducts />
      <FeaturedProducts />
      <NewArrivals />
    </div>
  );
}

export default HomePage;
