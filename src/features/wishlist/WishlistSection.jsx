import Button from "../../components/Button";
import WishlistItem from "./WishlistItem";
import DeleteIcon from "../../assets/icons/icon-delete.svg";
// import {getWishlist} from "./wishlistAPI";
// import { useState,useEffect } from "react";

function WishlistSection() {
//   const [count, setCount] = useState(0);

// useEffect(() => {
//   async function fetchCount() {
//     const data = await getWishlist();
//     setCount(data?.length ?? 0);
//   }
//   fetchCount();
// }, []);
  return (
    <section className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-10">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[20px]">
          Wishlist (1)
        </h1>

        <Button variant="outline">
          Move all to cart
        </Button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <WishlistItem icon={DeleteIcon} />
      </div>

    </section>
  );
}

export default WishlistSection;