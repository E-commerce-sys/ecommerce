// import Button from "../../components/Button";
// import WishlistItem from "./WishlistItem";
// import eyeIcon from "../../assets/icons/eye-Icon.svg";

// function JustForYou() {
//   return (
//     <section className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-10">
      
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <span className="w-3 h-6 md:w-4 md:h-7 lg:w-5 lg:h-8 bg-[rgb(var(--color-primary-main))] rounded-sm"></span>
//           <span className="text-[20px] font-semibold">Just For You</span>
//         </div>

//         <Button variant="outline">See All</Button>
//       </div>

//       {/* Products */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {/* <WishlistItem /> */}

//       </div>

//     </section>
//   );
// }

// export default JustForYou;

import { useEffect, useState } from "react";
import Button from "../../components/Button";
import CartSummary from "../cart/CartSummary"; // adjust path as needed
import { productsAPI } from "../products/productAPI";

function JustForYou() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsAPI()
      .then((allProducts) => {
        const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
        setProducts(shuffled.slice(0, 4));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-3 h-6 md:w-4 md:h-7 lg:w-5 lg:h-8 bg-[rgb(var(--color-primary-main))] rounded-sm"></span>
          <span className="text-[20px] font-semibold">Just For You</span>
        </div>
        <Button variant="outline">See All</Button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg" />
            ))
          : products.map((product) => (
              <CartSummary key={product.id} product={product} />
            ))}
      </div>

    </section>
  );
}

export default JustForYou;