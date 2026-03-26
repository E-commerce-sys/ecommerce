// /* eslint-disable react/react-in-jsx-scope */
// /* eslint-disable react/prop-types */
// import CartSummary from "../cart/CartSummary";
// import { productAPI } from "../products/productAPI";
// import { useState,useEffect } from "react";


// function WishlistItems({icon}) {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const data = await productAPI();
//         setProducts([data] || []);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProducts();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (products.length === 0) return <div>No products found</div>;

//   return (
//     <div className="flex gap-4 flex-wrap">
//       {products.map((product) => (
//         <div
//           key={product.id}
//           className="w-full aspect-squareflex justify-center"
//         >
//           <CartSummary
//             icon={icon}
//             product={product}
//             className="w-full lg:w-67.5 lg:h-67.5 aspect-square"
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default WishlistItems

import CartSummary from "../cart/CartSummary";
import {getWishlist} from "./wishlistAPI";
import { useState, useEffect } from "react";

function WishlistItems({ icon }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const data = await getWishlist();
        setProducts(data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (products.length === 0) return <div>No products found</div>;

  return (
    <div className="flex gap-4 flex-wrap">
      {products.map((item) => {
  const p = item.attributes[0];

  // const product = {
  //   id: p.id,
  //   attributes: {
  //     nameEn: p.name_en,
  //     nameAr: p.name_ar,
  //     nameKu: p.name_ku,
  //     averageRating: p.average_rating,
  //     ratingCount: p.rating_count,
  //     isNew: p.is_new,
  //     price: Number(p.effective_price),
  //     newPrice: Number(p.effective_price) ? Number(p.effective_price) : null,
  //     hasDiscount: p.has_discount,
  //     discountPercentage: p.discount_percentage,
  //     colors: p.colors,
  //     // primaryImage: p.primary_image,
  //   }
  // };
  const product = {
  id: p.id,
  attributes: {
    nameEn: p.name_en,
    nameAr: p.name_ar,
    nameKu: p.name_ku,
    averageRating: p.average_rating,
    ratingCount: p.rating_count,
    isNew: p.is_new,
    effectivePrice: Number(p.effective_price ?? p.price),
    originalPrice: p.has_discount ? Number(p.price) : null,
    hasDiscount: p.has_discount,
    discountPercentage: p.discount_percentage,
    colors: p.colors,
  }
};
  return (
    <div key={item.id} className="flex justify-center">
      <CartSummary
        icon={icon}
        product={product}
        className="w-full lg:w-67.5 lg:h-67.5 aspect-square"
      />
    </div>
  );
})}
    </div>
  );
}

export default WishlistItems;
