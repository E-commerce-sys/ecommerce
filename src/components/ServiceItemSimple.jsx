/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
function ServiceItemSimple({
  Icon,
  title,
  subtitle,
  iconBg = "bg-[rgb(var(--color-bg-dark))]",
  iconBgLight = "bg-[rgb(var(--color-border))]",
}) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div
        className={`w-20 h-20 flex items-center justify-center rounded-full ${iconBgLight}`}
      >
        <div
          className={`w-14.5 h-14.5 flex items-center justify-center rounded-full ${iconBg}`}
        >
          <img src={Icon} className="text-white" />
        </div>
      </div>

      <p className="font-bold text-[14px] md:text-[16px] lg:text-[18px] ">
        {title}
      </p>
      <p className="text-[12px] md:text-[14px] lg:text-[16px] text-gray-500">
        {subtitle}
      </p>
    </div>
  );
}

export default ServiceItemSimple;
