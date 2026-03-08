import DiscountButton from "../../components/DiscountButton";
function Discounts() {
  return (
    <div className="flex">
      <DiscountButton
        discount_rate="5%"
        color_var="--color-orange-soft"
        color_text="--color-text-orange"
      />
      <DiscountButton
        discount_rate="10%"
        color_var="--color-green-soft"
        color_text="--color-text-green"
      />
      <DiscountButton
        discount_rate="30%"
        color_var="--color-blue-soft"
        color_text="--color-text-blue"
      />
      <DiscountButton
        discount_rate="50%"
        color_var="--color-red-soft"
        color_text="--color-text-red"
      />
    </div>
  );
}

export default Discounts;
