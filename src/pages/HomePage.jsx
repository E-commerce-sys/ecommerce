import CategoryMenu from "../features/categories/CategoryMenu";
import FeaturedProducts from "../features/home/FeaturedProducts";
import OurProducts from "../features/home/OurProducts";

function HomePage() {
  return (
    <div>
      <CategoryMenu />
      <FeaturedProducts />
      <OurProducts />
    </div>
  );
}

export default HomePage;
