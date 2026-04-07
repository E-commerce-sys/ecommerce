/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from "react";

import OrderLineItemsTable from "./OrderLineItemsTable";
import { getUserOrders, ORDER_STATUS_FILTERS } from "./API/getOrders";

function ArrivedPage() {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await getUserOrders(ORDER_STATUS_FILTERS.arrived);
        if (!active) return;
        setOrders(data);
      } catch {
        if (!active) return;
        setError("Failed to load your arrived orders.");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  function toggleOrder(orderId) {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  }
  return (
    <div className="mx-auto w-full max-w-[1024px] p-4 sm:p-6">
      <div className="flex w-full min-w-0 flex-col gap-8 sm:gap-11">
        <div className="flex flex-col gap-1.5">
          <p className="text-lg font-medium text-[rgb(var(--color-primary-main))] sm:text-xl">
            Arrived Orders{" "}
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:gap-10">
          {loading ? (
            <p className="text-sm text-[rgb(var(--color-text-main-3))]">
              Loading...
            </p>
          ) : null}
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          {!loading && !error && orders.length === 0 ? (
            <p className="text-sm text-[rgb(var(--color-text-main-3))]">
              No arrived orders yet.
            </p>
          ) : null}

          {orders.map((order) => {
            const isOpen = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className="flex w-full min-w-0 flex-col gap-3 "
              >
                <div className="flex w-full min-w-0 flex-col gap-0 ">
                  <button
                    type="button"
                    onClick={() => toggleOrder(order.id)}
                    className="w-full min-w-0 cursor-pointer rounded-2xl border border-[#53A841] py-4 text-left transition bg-[#E3F9E4] hover:bg-[#DCF7DD] active:bg-[#D3F5D4] sm:rounded-3xl sm:py-6"
                  >
                    <div className="flex w-full flex-col gap-2 px-4 sm:gap-3 sm:px-6 md:px-8">
                      <div className="flex items-start justify-between">
                        <p className="min-w-0 text-base text-[rgb(var(--color-text-main-3))] sm:text-lg">
                          Order date: {order.orderDate}
                        </p>
                        <div className="flex md:h-8 md:w-8 shrink-0 items-center justify-center self-start rounded-full bg-[#53A841] text-sm text-[#E3F9E4] h-7 w-7">
                          {order.badge}
                        </div>
                      </div>
                      <p className="text-base text-[rgb(var(--color-text-main-3))] sm:text-lg">
                        Items : {order.itemCount}
                      </p>
                      <p className="text-base text-[rgb(var(--color-text-main-3))] sm:text-lg">
                        Total payment : {order.totalPayment} $
                      </p>
                      <p className="text-xs text-[rgb(var(--color-text-main-1))]">
                        {isOpen
                          ? "Tap to hide line items"
                          : "Tap to view line items"}
                      </p>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-3 w-full min-w-0">
                      <OrderLineItemsTable items={order.items} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ArrivedPage;
