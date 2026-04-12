import { useLoaderData } from "react-router-dom";

import CategoryMenu from "../features/categories/CategoryMenu";
import BestProducts from "../features/home/BestProducts";
import FeaturedProducts from "../features/home/FeaturedProducts";
import NewArrivals from "../features/home/NewArrivals";
import BannerSlider from "../features/home/BannerSlider";
import Discounts from "../features/home/Discounts";
import Services from "../features/home/Services";

function HomePage() {
  const { banners, bestProducts, ourProducts, newArrivals } = useLoaderData();

  return (
    <div className="">
      <CategoryMenu />

      <BannerSlider banners={banners} />
      <BestProducts data={bestProducts} />
      <Discounts />
      <FeaturedProducts data={ourProducts} />
      <NewArrivals data={newArrivals} />
      <Services />
    </div>
  );
}

export default HomePage;
