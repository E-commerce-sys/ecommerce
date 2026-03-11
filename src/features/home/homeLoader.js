import { bestProductAPI } from "../home/API/bestProduct";
import { categoriesAPI } from "../categories/categoriesAPI";
import { newArrivalProductAPI } from "../home/API/newArrivalProduct";
import { featuredProductAPI } from "../home/API/featuredProduct";

export async function homeLoader() {
  try {
    const [categories, bestProducts, ourProducts, newArrivals] =
      await Promise.all([
        categoriesAPI(),
        bestProductAPI(),
        featuredProductAPI(),
        newArrivalProductAPI(),
      ]);

    return {
      bestProducts,
      categories,
      newArrivals,
      ourProducts,
    };
  } catch (error) {
    throw new Error(`Failed to load home data: ${error}`);
  }
}
