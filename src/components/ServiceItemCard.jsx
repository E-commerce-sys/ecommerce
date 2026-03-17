/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line react/prop-types
function ServiceItemCard({ Icon, IconHover, title, subtitle }) {
  return (
    <div className="group border border-[rgb(var(--color-border))] rounded-lg flex flex-col items-center justify-center text-center py-10 transition-all duration-300 hover:bg-[rgb(var(--color-primary-main))] hover:shadow-md cursor-pointer">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[rgb(var(--color-border))] group-hover:bg-[rgb(var(--color-primary-1))] transition duration-300">
        <div className="w-14.5 h-14.5 flex items-center justify-center rounded-full bg-black group-hover:bg-white relative">
          {/* Normal Icon */}
          <img
            src={Icon}
            className="absolute inset-0 m-auto transition duration-300 group-hover:opacity-0"
          />

          {/* Hover Icon */}
          <img
            src={IconHover}
            className="absolute inset-0 m-auto opacity-0 transition duration-300 group-hover:opacity-100"
          />
        </div>
      </div>

      <p className="text-2xl font-bold mt-4 group-hover:text-white">{title}</p>

      <p className="text-gray-500 group-hover:text-white">{subtitle}</p>
    </div>
  );
}

export default ServiceItemCard;
