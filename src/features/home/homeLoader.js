import { bestProductAPI } from "../home/API/bestProduct";
import { categoriesAPI } from "../categories/categoriesAPI";
import { newArrivalProductAPI } from "../home/API/newArrivalProduct";
import { featuredProductAPI } from "../home/API/featuredProduct";
import { bannerProductAPI } from "../home/API/bannerProduct";

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
