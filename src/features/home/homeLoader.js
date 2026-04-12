import { bestProductAPI } from "./API/bestProduct";
import { categoriesAPI } from "../categories/categoriesAPI";
import { newArrivalProductAPI } from "./API/newArrivalProduct";
import { featuredProductAPI } from "./API/featuredProduct";
import { bannerProductAPI } from "./API/bannerProduct";

/**
 * Loads all data needed for the home page.
 * Used from `HomePage` (client) so the route can render immediately and show a
 * spinner while requests run. A route `loader` would block `HomePage` from
 * mounting until this finished, so `useNavigation().state === "loading"` inside
 * the page never matched while data was loading.
 */
export async function fetchHomePageData() {
  const [categories, bestProducts, ourProducts, newArrivals, banners] =
    await Promise.all([
      categoriesAPI(),
      bestProductAPI(),
      featuredProductAPI(),
      newArrivalProductAPI(),
      bannerProductAPI(),
    ]);

  return {
    bestProducts,
    categories,
    newArrivals,
    ourProducts,
    banners,
  };
}
