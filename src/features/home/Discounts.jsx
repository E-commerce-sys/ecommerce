/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import DiscountButton from "../../components/DiscountButton";

function Discounts() {
  const navigate = useNavigate();

  function handleDiscount(discount) {
    navigate(`/search?discount=${discount}`);
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-15 md:my-25 max-w-6xl mx-auto px-4">
      <DiscountButton
        discountRate={10}
        colorVar="--color-orange-soft"
        colorText="--color-text-orange"
        onSelect={handleDiscount}
      />

      <DiscountButton
        discountRate={20}
        colorVar="--color-green-soft"
        colorText="--color-text-green"
        onSelect={handleDiscount}
      />

      <DiscountButton
        discountRate={30}
        colorVar="--color-blue-soft"
        colorText="--color-text-blue"
        onSelect={handleDiscount}
      />

      <DiscountButton
        discountRate={40}
        colorVar="--color-red-soft"
        colorText="--color-text-red"
        onSelect={handleDiscount}
      />
    </div>
  );
}
export default Discounts;
