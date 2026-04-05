/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { useState } from "react";

import OrderProgress from "./OrderProgress";
import OrderLineItemsTable from "./OrderLineItemsTable";
import { FAKE_ORDERS } from "./progressPageFakeData";

function ProgressPage() {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  function toggleOrder(orderId) {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  }

  return (
    <div className="mx-auto box-border w-full max-w-[1024px] rounded-lg p-4 shadow sm:rounded-xl sm:p-6">
      <div className="flex w-full min-w-0 flex-col gap-8 sm:gap-11">
        <div className="flex flex-col gap-1.5">
          <p className="text-lg font-medium text-[rgb(var(--color-primary-main))] sm:text-xl">
            Your Progress
          </p>
          <p className="text-xs font-medium text-[rgb(var(--color-text-main))] sm:text-sm">
            You can only cancel your order while it is in Pending or Preparing
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:gap-10">
          {FAKE_ORDERS.map((order) => {
            const isOpen = expandedOrderId === order.id;

            return (
              <div key={order.id} className="flex w-full min-w-0 flex-col gap-3">
                <div className="flex w-full min-w-0 flex-col gap-0">
                  <button
                    type="button"
                    onClick={() => toggleOrder(order.id)}
                    className="w-full min-w-0 cursor-pointer rounded-2xl border border-[rgb(var(--color-border))] py-4 text-left transition hover:bg-[rgb(var(--color-grey))]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary-main))] sm:rounded-3xl sm:py-6"
                  >
                    <div className="flex w-full flex-col gap-2 px-4 sm:gap-3 sm:px-6 md:px-8">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <p className="min-w-0 text-base text-[rgb(var(--color-text-main-3))] sm:text-lg">
                          Order date: {order.orderDate}
                        </p>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center self-start rounded-full bg-[rgb(var(--color-primary-1))] text-sm text-[rgb(var(--color-primary-main))] sm:h-[30px] sm:w-[30px]">
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

                  <div className="mt-3 min-w-0">
                    <OrderProgress currentStatus={order.status} />
                  </div>
                </div>

                <div className="flex justify-stretch sm:justify-end">
                  <button
                    type="button"
                    className="h-11 w-full rounded border border-[rgb(var(--color-border))] font-medium transition hover:bg-[rgb(var(--color-primary-light))] cursor-pointer sm:h-12 sm:w-24"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProgressPage;
