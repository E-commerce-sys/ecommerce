import { bestProductAPI } from "./API/bestProduct";
import { categoriesAPI } from "../categories/categoriesAPI";
import { newArrivalProductAPI } from "./API/newArrivalProduct";
import { featuredProductAPI } from "./API/featuredProduct";
import { bannerProductAPI } from "./API/bannerProduct";

export async function homeLoader() {
  try {
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
  } catch (error) {
    throw new Error(`Failed to load home data: ${error}`);
  }
}
