function ServiceItem({ icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center text-center gap-4 px-4">
      {/* Icon circle */}
      <div className="relative flex items-center justify-center w-15 h-15 md:w-18 md:h-18 lg:w-20 lg:h-20">
        <div className="absolute w-15 h-15 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full bg-[rgb(var(--color-primary-1))]"></div>

        <div className="relative flex items-center justify-center w-9 h-9 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-[rgb(var(--color-primary-main))]">
          <img src={icon} alt={title} className="w-6 h-6" />
        </div>
      </div>

      {/* Text */}
      <p className="text-[12px] md:text-[20px] lg:text-[22px] font-semibold text-[rgb(var(--color-text-main))]">
        {title}
      </p>

      <p className="text-[rgb(var(--color-text-main-3))] text-[10px] md:text-[14px] lg:text-[16px]">
        {subtitle}
      </p>
    </div>
  );
}

export default ServiceItem;
