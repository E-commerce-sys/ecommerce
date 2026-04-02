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
import { getWishlist, getPagination } from "./wishlistAPI";
import { useState, useEffect } from "react";

function WishlistItems({ icon }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        setLoading(true);
        const [data, meta] = await Promise.all([
          getWishlist(currentPage),
          getPagination(currentPage),
        ]);
        setProducts(data ?? []);
        setTotalPages(meta.last_page);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, [currentPage]);

  const setPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPages = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];

    if (currentPage >= totalPages - 3)
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  if (loading) return <div>Loading...</div>;
  if (products.length === 0) return <div>No products found</div>;

  return (
    <div className="flex flex-col gap-8 w-full min-h-0">

      {/* Products — same grid/card sizing as home */}
      <div className="grid w-full min-w-0 max-w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-3 xl:grid-cols-4">
        {products.map((item) => {
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
            <div key={item.id} className="min-w-0">
              <CartSummary
                product={product}
                icon={icon}
                wishlistItemId={item.id}
                wrapperClassName="flex w-full min-w-0 flex-col gap-3 m-0"
                className="aspect-square w-full min-w-0"
              />
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
        {getPages().map((page, index) =>
          page === "..." ? (
            <span key={index} className="w-8 h-8 flex items-center justify-center text-sm">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => setPage(page)}
              className={`w-8 h-8 rounded text-[14px] font-medium transition-colors ${
                currentPage === page
                  ? "bg-[rgb(var(--color-primary-main))] text-white"
                  : "bg-[#F5F5F5] text-black hover:bg-[rgb(var(--color-primary-1))]"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

    </div>
  );
}

export default WishlistItems;