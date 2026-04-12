import { useEffect, useState } from "react";

import CategoryMenu from "../features/categories/CategoryMenu";
import BestProducts from "../features/home/BestProducts";
import FeaturedProducts from "../features/home/FeaturedProducts";
import NewArrivals from "../features/home/NewArrivals";
import BannerSlider from "../features/home/BannerSlider";
import Discounts from "../features/home/Discounts";
import Services from "../features/home/Services";
import Spinner from "../components/Spinner";
import { fetchHomePageData } from "../features/home/homeLoader";

function HomePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);

    fetchHomePageData()
      .then((payload) => {
        if (!cancelled) setData(payload);
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e : new Error(String(e)));
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    throw error;
  }

  if (!data) {
    return (
      <div className="mt-10">
        {" "}
        <Spinner />
      </div>
    );
  }

  const { banners, bestProducts, ourProducts, newArrivals } = data;

  return (
    <div>
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
