function Discounts(props) {
  return (
    <div className="flex gap-3 p-2">
      <button className={`flex flex-col items-center justify-center w-72 h-28 rounded-lg px-4 py-3 text-[rgb(var(--color-text-orange))] bg-[rgb(var(${props.color_var}))]`}>
        <span className="text-4xl font-bold">{props.discount_rate}</span>
        <span className="text-s mt-1">ve üzeri indirim</span>
    </button>
    </div>
  );
}

export default Discounts;




{/* The implementation should follow this  
  <div className="flex">
        <Discounts discount_rate="5%" color_var="--color-ui-orange-soft"/>
        <Discounts discount_rate="10%" color_var="--color-ui-green-soft"/>
        <Discounts discount_rate="30%" color_var="--color-ui-blue-soft"/>
        <Discounts discount_rate="50%" color_var="--color-ui-red-soft"/>
        </div>
  */}
