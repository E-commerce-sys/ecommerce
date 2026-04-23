import axiosInstance from "../../../axios/axiosInterceptor";

const INCLUDE =
  "orderItems.productVariant.product.images,orderItems.productVariant.color,orderItems.productVariant.size,orderItems.productVariant.product.productColors,orderItems.productVariant.product.productSizes";

export const ORDER_STATUS_FILTERS = {
  progress: ["Pending", "Preparing", "Shipping", "Delivering"],
  cancelled: ["Cancelled"],
  arrived: ["Arrived"],
};

function toMoney(value) {
  const n = Number(value ?? 0);
  if (Number.isNaN(n)) return "0.00";
  return n.toFixed(2);
}

function toOrderDate(order) {
  const raw = order?.attributes?.createdAt || order?.attributes?.created_at;
  if (!raw) return `#${order?.id ?? ""}`;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return `#${order?.id ?? ""}`;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function mapOrderItem(item) {
  const variant = item?.included?.productVariant;
  const product = variant?.included?.product;
  const color = variant?.included?.color;
  const size = variant?.included?.size;
  const quantity = Number(item?.attributes?.quantity ?? 0);
  const unitPrice = Number(item?.attributes?.unitPrice ?? 0);

  return {
    id: Number(item?.id),
    name: product?.attributes?.nameEn ?? "Product",
    imageUrl: product?.attributes?.primaryImage ?? "",
    price: toMoney(unitPrice),
    color: color?.attributes?.name ?? "-",
    size: size?.attributes?.sizeLabel || size?.attributes?.name || "-",
    quantity,
    subtotal: toMoney(unitPrice * quantity),
  };
}

function mapOrder(order, index) {
  const rawItems =
    order?.included?.OrderItems || order?.included?.orderItems || [];
  const items = Array.isArray(rawItems) ? rawItems.map(mapOrderItem) : [];

  const rawStatus = String(order?.attributes?.status ?? "pending")
    .trim()
    .toLowerCase();
  const normalizedStatus = rawStatus === "delivered" ? "arrived" : rawStatus;

  return {
    id: Number(order?.id),
    orderDate: toOrderDate(order),
    itemCount: items.length,
    totalPayment: toMoney(order?.attributes?.totalPrice),
    status: normalizedStatus,
    badge: index + 1,
    items,
  };
}

export async function getUserOrders(statuses = ORDER_STATUS_FILTERS.progress) {
  const statusFilter = Array.isArray(statuses) ? statuses.join(",") : "";
  const res = await axiosInstance.get("/api/user-orders", {
    params: {
      "filter[status]": statusFilter,
      include: INCLUDE,
    },
  });

  const data = res?.data?.data;
  if (!Array.isArray(data)) return [];
  return data.map(mapOrder);
}
