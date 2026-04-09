import axiosInstance from "../../axios/axiosInterceptor";

const refKey = (type, id) => `${type}:${String(id)}`;

function buildIncludedMap(included) {
  const map = new Map();
  if (!Array.isArray(included)) return map;
  for (const item of included) {
    map.set(refKey(item.type, item.id), item);
  }
  return map;
}

function resolveVariant(variant, rootIncludedMap) {
  const colorRel = variant.relationships?.color?.data;
  const sizeRel = variant.relationships?.size?.data;

  let color = variant.included?.color ?? null;
  let size = variant.included?.size ?? null;

  if (!color && colorRel) {
    color = rootIncludedMap.get(refKey(colorRel.type, colorRel.id)) ?? null;
  }
  if (!size && sizeRel) {
    size = rootIncludedMap.get(refKey(sizeRel.type, sizeRel.id)) ?? null;
  }

  return {
    id: Number(variant.id),
    color,
    size,
    colorId: color ? Number(color.id) : null,
    sizeId: size ? Number(size.id) : null,
    isAvailable: variant.attributes?.isAvailable,
  };
}

function collectVariantsFromPayload(body) {
  const productNode = body.data;
  if (!productNode) return { productNode: null, variantsRaw: [] };

  const nested = productNode.included?.variants;
  if (Array.isArray(nested) && nested.length > 0) {
    return { productNode, variantsRaw: nested };
  }

  const rootIncluded = body.included;
  const refs = productNode.relationships?.variants?.data ?? [];
  if (!Array.isArray(rootIncluded) || refs.length === 0) {
    return { productNode, variantsRaw: [] };
  }

  const wanted = new Set(refs.map((r) => refKey(r.type, r.id)));
  const variantsRaw = rootIncluded.filter((item) =>
    wanted.has(refKey(item.type, item.id)),
  );
  return { productNode, variantsRaw };
}

/**
 * GET /api/products/:id?include=variants.size,variants.color
 * Normalizes nested or standard JSON:API included variants into a stable shape.
 */
export async function fetchProductDetail(id) {
  const res = await axiosInstance.get(
    `/api/products/${id}?include=variants.size,variants.color`,
  );
  const body = res.data;
  const { productNode, variantsRaw } = collectVariantsFromPayload(body);

  if (!productNode) {
    return null;
  }

  const rootIncludedMap = buildIncludedMap(body.included);
  const variants = variantsRaw.map((v) => resolveVariant(v, rootIncludedMap));

  return {
    id: Number(productNode.id),
    type: productNode.type,
    attributes: productNode.attributes,
    relationships: productNode.relationships,
    included: productNode.included,
    variants,
  };
}
