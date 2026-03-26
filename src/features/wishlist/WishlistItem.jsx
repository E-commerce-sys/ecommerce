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
import {getWishlist,deleteWishlistItem} from "./wishlistAPI";
import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 8; 

function WishlistItems() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) return <div>Loading...</div>;
  if (products.length === 0) return <div>No products found</div>;

  return (
  <div className="flex flex-col gap-8 w-full min-h-0">

    {/* Products */}
    <div className="flex flex-wrap w-full min-h-0">
      {paginatedProducts.map((item) => {
        const p = item.included.product;

        const product = {
          id: p.id,
          attributes: {
            nameEn: p.attributes.nameEn,
            nameAr: p.attributes.nameAr,
            nameKu: p.attributes.nameKu,
            averageRating: p.attributes.averageRating,
            ratingCount: p.attributes.ratingCount,
            isNew: p.attributes.isNew,
            effectivePrice: Number(p.attributes.effectivePrice),
            originalPrice: Number(p.attributes.originalPrice),
            hasDiscount: p.attributes.hasDiscount,
            discountPercentage: p.attributes.discountPercentage,
            primaryImage: p.attributes.primaryImage,
            isInWishList: true,
          },
        };

        return (
          <div key={item.id} style={{ width: "25%" }} className="shrink-0 grow-0 overflow-hidden">
            <CartSummary key={product.id} product={product} wishlistItemId={item.id} />
          </div>
        );
      })}
    </div>

    {/* Pagination — always render for debugging */}
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => {
            setCurrentPage(i + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
            currentPage === i + 1
              ? "bg-[rgb(var(--color-primary-main))] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>

  </div>
);
}

export default WishlistItems;
