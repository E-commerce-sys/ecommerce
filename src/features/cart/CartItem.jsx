import { useState } from "react";
import AddWishlist from "../../assets/icons/heart-Icon.svg";
import FilledHeart from '../../assets/icons/heart-filled-Icon.svg';

function CartItem(prop) {
  const [isFilled,setIsFilled]=useState(false)
  function wishlistHandler(){
    setIsFilled(prev=>!prev)


  }
  return (
    <div className="bg-[rgb(var(--color-grey))] relative w-64 h-64 group overflow-hidden rounded-lg gap-6">
      <img
        src={prop.img}
        className="w-full transition-transform duration-300 py-27.75 px-11.25"
      />
      <button
        className="absolute top-3 right-3 w-8.5 h-8.5
                   bg-white p-1 rounded-full shadow-md
                   opacity-100"
        onClick={wishlistHandler}
      >
        <img src={isFilled?FilledHeart:AddWishlist} sizes="18px" />
      </button>
    </div>
  );
}

export default CartItem;
