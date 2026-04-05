import axiosInstance from "../../../axios/axiosInterceptor";

const INCLUDE =
  "cartItems.productVariant.product.images,cartItems.productVariant.color,cartItems.productVariant.size,cartItems.productVariant.product.productColors,cartItems.productVariant.product.productSizes";

/**
 * Maps one API cart line (cartItem + nested productVariant) to UI shape.
 */
export function mapCartItemFromApi(item) {
  const variant = item.included?.productVariant;
  if (!variant) return null;

  const product = variant.included?.product;
  if (!product) return null;

  const color = variant.included?.color;
  const size = variant.included?.size;

  const colorLabel = color?.attributes?.name ?? null;
  const sizeLabel = size?.attributes
    ? size.attributes.sizeLabel || size.attributes.name
    : null;

  return {
    id: Number(item.id),
    productVariantId: Number(variant.id),
    productId: Number(product.id),
    img: product.attributes.primaryImage,
    nameEn: product.attributes.nameEn,
    nameAr: product.attributes.nameAr,
    nameKu: product.attributes.nameKu,
    price: Number(item.attributes.unitPrice),
    quantity: item.attributes.quantity,
    colorLabel,
    sizeLabel,
  };
}

/**
 * Supports cart payload where `included.cartItems` lives under `data` (new API).
 */
export function mapCartItemsFromResponse(resBody) {
  const cartRoot = resBody?.data;
  const nested = cartRoot?.included?.cartItems;
  const legacyFlat = resBody?.included?.cartItems;
  const raw = Array.isArray(nested)
    ? nested
    : Array.isArray(legacyFlat)
      ? legacyFlat
      : [];

  return raw.map(mapCartItemFromApi).filter(Boolean);
}

export async function getCartItems() {
  const res = await axiosInstance.get(`/api/user-cart?include=${INCLUDE}`);
  return res.data;
}
