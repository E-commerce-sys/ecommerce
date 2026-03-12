import { useLoaderData } from "react-router-dom";

import CategoryMenu from "../features/categories/CategoryMenu";
import BestProducts from "../features/home/BestProducts";
import FeaturedProducts from "../features/home/FeaturedProducts";
import NewArrivals from "../features/home/NewArrivals";
import BannerSlider from "../features/home/BannerSlider";

function HomePage() {
  const { bestProducts, categories, newArrivals, ourProducts, banners } =
    useLoaderData();

  return (
    <div className="mt-17">
      <CategoryMenu categories={categories} />
      <BannerSlider banners={banners} />
      <BestProducts data={bestProducts} />
      <FeaturedProducts data={ourProducts} />
      <NewArrivals data={newArrivals} />
    </div>
  );
}
export default HomePage;
