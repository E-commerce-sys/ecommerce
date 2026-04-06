/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

function OrderLineItemsTable({ items }) {
  if (!items?.length) return null;

  return (
    <>
      {/* Desktop / tablet */}
      <div className="hidden w-full min-w-0 overflow-hidden rounded-xl border border-[rgb(var(--color-border))] bg-white shadow-sm md:block">
        <div className="w-full min-w-0 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm text-[rgb(var(--color-text-main))]">
            <thead>
              <tr className="bg-[rgb(var(--color-grey))]">
                <th className="px-3 py-3 text-sm font-semibold sm:px-4 sm:py-4 sm:text-base">
                  Product
                </th>
                <th className="px-3 py-3 text-center text-sm font-semibold sm:px-4 sm:py-4 sm:text-base">
                  Price
                </th>
                <th className="px-3 py-3 text-center text-sm font-semibold sm:px-4 sm:py-4 sm:text-base">
                  Color
                </th>
                <th className="px-3 py-3 text-center text-sm font-semibold sm:px-4 sm:py-4 sm:text-base">
                  size
                </th>
                <th className="px-3 py-3 text-center text-sm font-semibold sm:px-4 sm:py-4 sm:text-base">
                  Quantity
                </th>
                <th className="px-3 py-3 text-center text-sm font-semibold sm:px-4 sm:py-4 sm:text-base">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-[rgb(var(--color-border))] bg-white"
                >
                  <td className="px-3 py-3 sm:px-4 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="h-10 w-14 shrink-0 rounded object-contain bg-[rgb(var(--color-grey))] sm:h-12 sm:w-16"
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center sm:px-4 sm:py-4">
                    ${item.price}
                  </td>
                  <td className="px-3 py-3 text-center sm:px-4 sm:py-4">
                    {item.color}
                  </td>
                  <td className="px-3 py-3 text-center capitalize sm:px-4 sm:py-4">
                    {item.size}
                  </td>
                  <td className="px-3 py-3 text-center sm:px-4 sm:py-4">
                    {String(item.quantity).padStart(2, "0")}
                  </td>
                  <td className="px-3 py-3 text-center font-medium sm:px-4 sm:py-4">
                    ${item.subtotal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <ul className="flex flex-col gap-3 md:hidden">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-[rgb(var(--color-border))] bg-white p-4 shadow-sm"
          >
            <div className="flex gap-3 border-b border-[rgb(var(--color-border))] pb-3">
              <img
                src={item.imageUrl}
                alt=""
                className="h-14 w-20 shrink-0 rounded object-contain bg-[rgb(var(--color-grey))]"
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[rgb(var(--color-text-main))]">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-[rgb(var(--color-text-main-3))]">
                  Quantity: {String(item.quantity).padStart(2)}
                </p>
              </div>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              <dt className="text-[rgb(var(--color-text-main-3))]">Price</dt>
              <dd className="text-right font-medium">${item.price}</dd>
              <dt className="text-[rgb(var(--color-text-main-3))]">Color</dt>
              <dd className="text-right">{item.color}</dd>
              <dt className="text-[rgb(var(--color-text-main-3))]">Size</dt>
              <dd className="text-right capitalize">{item.size}</dd>
              <dt className="text-[rgb(var(--color-text-main-3))]">Subtotal</dt>
              <dd className="text-right font-semibold">${item.subtotal}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

export default OrderLineItemsTable;
