/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import CategoryMenu from "../features/categories/CategoryMenu";
import BestProducts from "../features/home/BestProducts";
import FeaturedProducts from "../features/home/FeaturedProducts";
import NewArrivals from "../features/home/NewArrivals";
import BannerSlider from "../features/home/BannerSlider";
import Discounts from "../features/home/Discounts";
import Services from "../features/home/Services";
import HomeBlockSkeleton from "../features/home/HomeBlockSkeleton";
import { useHomeSectionsData } from "../features/home/useHomeSectionsData";

function HomePage() {
  const { banners, bestProducts, ourProducts, newArrivals } =
    useHomeSectionsData();

  return (
    <div className="">
      <CategoryMenu />

      {banners === undefined ? (
        <div className="hidden w-full justify-center py-10 md:flex">
          <div className="h-80 w-[90%] max-w-300 animate-pulse rounded-md bg-[rgb(var(--color-grey))]" />
        </div>
      ) : (
        <BannerSlider banners={banners} />
      )}

      {bestProducts === undefined ? (
        <HomeBlockSkeleton />
      ) : (
        <BestProducts data={bestProducts} />
      )}

      {bestProducts !== undefined && <Discounts />}

      {ourProducts === undefined ? (
        <HomeBlockSkeleton />
      ) : (
        <FeaturedProducts data={ourProducts} />
      )}

      {newArrivals === undefined ? (
        <HomeBlockSkeleton className="min-h-[200px]" />
      ) : (
        <NewArrivals data={newArrivals} />
      )}

      <Services />
    </div>
  );
}

export default HomePage;
