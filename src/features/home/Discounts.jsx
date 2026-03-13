/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import DiscountButton from "../../components/DiscountButton";
import { useState } from "react";

function Discounts() {
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  function handleDiscount(discount) {
    console.log("Selected discount:", discount);
    setSelectedDiscount(discount);
  }

  return (
    <div className="grid grid-cols-2  md:grid-cols-4 gap-6 my-15 md:my-25 max-w-6xl mx-auto px-4">
      <DiscountButton
        discountRate={5}
        colorVar="--color-orange-soft"
        colorText="--color-text-orange"
        onSelect={handleDiscount}
      />

      <DiscountButton
        discountRate={10}
        colorVar="--color-green-soft"
        colorText="--color-text-green"
        onSelect={handleDiscount}
      />

      <DiscountButton
        discountRate={20}
        colorVar="--color-blue-soft"
        colorText="--color-text-blue"
        onSelect={handleDiscount}
      />

      <DiscountButton
        discountRate={30}
        colorVar="--color-red-soft"
        colorText="--color-text-red"
        onSelect={handleDiscount}
      />
    </div>
  );
}

export default Discounts;
