function DiscountButton(props) {
  return (
    <div className="flex gap-3 p-2">
      <button className={`flex flex-col items-center justify-center w-72 h-28 rounded-lg px-4 py-3`} style={{ 
          backgroundColor: `rgb(var(${props.color_var}))`,
          color: `rgb(var(${props.color_text}))`
        }}>
        <span className="text-4xl font-bold">{props.discount_rate}</span>
        <span className="text-s mt-1">ve üzeri indirim</span>
    </button>
    </div>
);
}

export default DiscountButton;
