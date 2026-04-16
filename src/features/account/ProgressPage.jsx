import { useCallback, useEffect, useState } from "react";
import OrderProgress from "./OrderProgress";
import OrderLineItemsTable from "./OrderLineItemsTable";
import { getUserOrders, ORDER_STATUS_FILTERS } from "./API/getOrders";
import { cancelOrder } from "./API/cancelOrder";
import Button from "../../components/Button";

function ProgressPage() {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");
    const data = await getUserOrders(ORDER_STATUS_FILTERS.progress);
    setOrders(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;

    loadOrders().catch(() => {
      if (!active) return;
      setError("Failed to load your orders.");
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [loadOrders]);

  function toggleOrder(orderId) {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  }

  function openCancelModal(orderId) {
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  }

  function closeCancelModal() {
    if (cancelLoading) return;
    setShowCancelModal(false);
    setSelectedOrderId(null);
  }

  async function handleConfirmCancel() {
    if (!selectedOrderId || cancelLoading) return;
    try {
      setCancelLoading(true);
      await cancelOrder(selectedOrderId);
      closeCancelModal();
      await loadOrders();
    } catch {
      setError("Failed to cancel order.");
    } finally {
      setCancelLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1024px] p-4 sm:p-6">
      <div className="flex w-full min-w-0 flex-col gap-8 sm:gap-11">
        <div className="flex flex-col gap-1.5">
          <p className="text-lg font-medium text-[rgb(var(--color-primary-main))] sm:text-xl">
            Your Progress
          </p>
          <p className="text-xs font-medium text-[rgb(var(--color-text-main))] sm:text-sm">
            You can only cancel your order while it is in Pending or Preparing
          </p>
        </div>

        <div className="flex flex-col lg:gap-14 gap-10">
          {loading ? (
            <p className="text-sm text-[rgb(var(--color-text-main-3))]">
              Loading...
            </p>
          ) : null}
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          {!loading && !error && orders.length === 0 ? (
            <p className="text-sm text-[rgb(var(--color-text-main-3))]">
              No active orders found.
            </p>
          ) : null}

          {orders.map((order) => {
            const isOpen = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className="flex w-full min-w-0 flex-col gap-3"
              >
                <div className="flex w-full min-w-0 flex-col gap-0">
                  <button
                    type="button"
                    onClick={() => toggleOrder(order.id)}
                    className="w-full min-w-0 cursor-pointer rounded-2xl border border-[rgb(var(--color-border))] py-4 text-left transition hover:bg-[rgb(var(--color-grey))]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary-main))] sm:rounded-3xl sm:py-6"
                  >
                    <div className="flex w-full flex-col gap-2 px-4 sm:gap-3 sm:px-6 md:px-8">
                      <div className="flex items-start justify-between">
                        <p className="min-w-0 text-base text-[rgb(var(--color-text-main-3))] sm:text-lg">
                          Order date: {order.orderDate}
                        </p>
                        <div className="flex md:h-8 md:w-8 shrink-0 items-center justify-center self-start rounded-full bg-[rgb(var(--color-primary-1))] text-sm text-[rgb(var(--color-primary-main))] h-7 w-7">
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

                {(order.status === "pending" ||
                  order.status === "preparing") && (
                  <div className="flex justify-stretch sm:justify-end">
                    <button
                      type="button"
                      onClick={() => openCancelModal(order.id)}
                      className="h-11 w-full rounded border border-[rgb(var(--color-border))] font-medium transition hover:bg-[rgb(var(--color-grey))] cursor-pointer sm:h-12 sm:w-24"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showCancelModal && (
        <div
          onClick={closeCancelModal}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              onClick={closeCancelModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl cursor-pointer"
            >
              ×
            </button>

            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-xl md:text-2xl font-semibold text-[rgb(var(--color-text-main))]">
                Canceling Order
              </h2>

              <p className="text-sm md:text-base text-[rgb(var(--color-text-main-1))] leading-6">
                Are you sure you want to cancel this order?
              </p>

              <div className="flex justify-center sm:flex-row gap-3 mt-2">
                <Button onClick={handleConfirmCancel} disabled={cancelLoading}>
                  {cancelLoading ? "Cancelling..." : "Cancel Order"}
                </Button>

                <Button onClick={closeCancelModal} variant="outline">
                  Go back
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressPage;
