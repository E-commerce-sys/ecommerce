/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
function ServiceItem({ Icon, title, subtitle, className = "",icon_bg= "bg-gray-100", text_hover="",iconClassName}) {
  console.log("Component is rendering")
  return (
    <div className={`group flex flex-col items-center text-center gap-4 cursor-pointer transition-colors duration-300 ${className}`}>
      
      <div className={`relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gray-300 rounded-full aspect-square `}>
      <div className={`relative flex items-center justify-center w-11 h-11 md:w-13 md:h-13 rounded-full aspect-square ${icon_bg ? icon_bg : "bg-gray-100"}`}>
      {Icon ? <Icon className={`text-white ${iconClassName}`} /> : <div>NO ICON</div>}
      </div>
    </div>

      <p className={`text-[12px] md:text-[20px] lg:text-[32px] font-bold text-[rgb(var(--color-text-main))] ${text_hover}`}>
        {title}
      </p>

      <p className={`font-normal text-[rgb(var(--color-text-main-3))] text-[10px] md:text-[14px] lg:text-[16px] ${text_hover}`}>
        {subtitle}
      </p>

    </div>
  );
}

export default ServiceItem;

