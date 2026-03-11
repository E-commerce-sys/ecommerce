import { useLoaderData } from "react-router-dom";

import CategoryMenu from "../features/categories/CategoryMenu";
import BestProducts from "../features/home/BestProducts";
import FeaturedProducts from "../features/home/FeaturedProducts";
import NewArrivals from "../features/home/NewArrivals";
function HomePage() {
  const { bestProducts, categories, newArrivals, ourProducts } =
    useLoaderData();

  return (
    <div className="mt-17">
      <CategoryMenu categories={categories} />
      <BestProducts data={bestProducts} />
      <FeaturedProducts data={ourProducts} />
      <NewArrivals data={newArrivals} />
    </div>
  );
}

export default HomePage;
