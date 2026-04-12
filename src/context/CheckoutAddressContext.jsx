import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../features/basket/api/createOrder";
import { useCart } from "./CartContext";
import { useAddress } from "./AddressContext";
const CheckoutAddressContext = createContext(null);

const PLACEHOLDER = "";

/** Set as `orderError` when Place Order runs without a valid saved or manual address. */
export const ORDER_ERROR_ADDRESS_REQUIRED = "__checkout_address_required__";

/** `address` from AddressContext is `GET /api/user-addresses` → `res.data.data` (array of JSON:API-style rows). */
function normalizeSavedAddresses(addressList) {
  if (!Array.isArray(addressList)) return [];
  return addressList.map((item) => {
    const id = item?.id;
    const attr = item?.attributes ?? {};
    const line1 = [attr.addressName]
      .filter((x) => x != null && String(x).trim() !== "")
      .join(" ");
    const label =
      [line1].filter(Boolean).join(" — ") ||
      (id != null ? `Address #${id}` : "Address");
    return { id: String(id), label };
  });
}

function parseOrderErrorPayload(payload) {
  const errors = payload?.errors;
  if (Array.isArray(errors)) {
    const messages = errors
      .map((e) =>
        e && typeof e === "object" && typeof e.message === "string"
          ? e.message
          : null,
      )
      .filter(Boolean);
    if (messages.length) {
      return {
        message: messages.join("\n"),
        outOfStockItemId: errors.reduce((acc, e) => {
          if (acc != null) return acc;
          const oid = e?.outOfStockItemId;
          return oid != null && oid !== "" ? Number(oid) : null;
        }, null),
      };
    }
  }

  if (errors && typeof errors === "object" && !Array.isArray(errors)) {
    const msg = typeof errors.message === "string" ? errors.message : null;
    const oid = errors.outOfStockItemId;
    return {
      message: msg,
      outOfStockItemId: oid != null && oid !== "" ? Number(oid) : null,
    };
  }

  if (typeof payload?.message === "string") {
    return { message: payload.message, outOfStockItemId: null };
  }

  return {
    message: null,
    outOfStockItemId: null,
    fallback: true,
  };
}

function buildIncludedAddressBody(formData) {
  const city = String(formData.city ?? "").trim();
  const streetName = String(formData.streetName ?? "").trim();
  const houseNumber = String(formData.houseNumber ?? "").trim();

  const attributes = {
    city,
    streetName,
  };
  if (houseNumber !== "") {
    attributes.houseNumber = houseNumber;
  }

  return {
    data: {
      included: {
        address: {
          attributes,
        },
      },
    },
  };
}

/** JSON:API-style key expected by backend: `data.relationships.shippingAddress.data.id` */
function buildSavedAddressBody(savedId) {
  const id = Number(savedId);
  return {
    data: {
      relationships: {
        shippingAddress: {
          data: { id },
        },
      },
    },
  };
}

function isSavedAddressSelection(selectedOption, savedAddresses) {
  return (
    selectedOption !== PLACEHOLDER &&
    savedAddresses.some((a) => String(a.id) === String(selectedOption))
  );
}

export function CheckoutAddressProvider({ children }) {
  const { address, loading: addressLoading } = useAddress();
  const navigate = useNavigate();
  const { fetchCart, clearCartLocally } = useCart();

  const savedAddresses = useMemo(
    () => normalizeSavedAddresses(address),
    [address],
  );

  const [selectedOption, setSelectedOption] = useState(PLACEHOLDER);
  const [formData, setFormData] = useState({
    city: "",
    streetName: "",
    houseNumber: "",
    saveInfo: false,
  });

  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [outOfStockCartItemId, setOutOfStockCartItemId] = useState(null);

  const resetOrderUi = useCallback(() => {
    setOrderError(null);
    setOrderSuccess(null);
    setOutOfStockCartItemId(null);
  }, []);

  /** Saved row selected (inputs stay empty) OR user typed city + street (no saved row). */
  const canPlaceOrder = useMemo(() => {
    if (isSavedAddressSelection(selectedOption, savedAddresses)) return true;
    return (
      String(formData.city ?? "").trim() !== "" &&
      String(formData.streetName ?? "").trim() !== ""
    );
  }, [selectedOption, savedAddresses, formData.city, formData.streetName]);

  const setSelectedOptionAndSync = useCallback(
    (value) => {
      resetOrderUi();
      setSelectedOption(value);
      setFormData((prev) => ({
        ...prev,
        city: "",
        streetName: "",
        houseNumber: "",
      }));
    },
    [resetOrderUi],
  );

  const updateFormField = useCallback(
    (e) => {
      resetOrderUi();
      const { name, value, type, checked } = e.target;
      const nextVal = type === "checkbox" ? checked : value;

      if (name === "city" || name === "streetName" || name === "houseNumber") {
        setSelectedOption(PLACEHOLDER);
        setFormData((prev) => ({
          ...prev,
          [name]: nextVal,
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: nextVal,
      }));
    },
    [resetOrderUi],
  );

  const clearOutOfStockHighlight = useCallback(() => {
    setOutOfStockCartItemId(null);
  }, []);

  const placeOrder = useCallback(async () => {
    if (!canPlaceOrder) {
      setOrderSuccess(null);
      setOutOfStockCartItemId(null);
      setOrderError(ORDER_ERROR_ADDRESS_REQUIRED);
      return;
    }

    setOrderError(null);
    setOrderSuccess(null);
    const saveAddressToUser = !!formData.saveInfo;
    const useSaved = isSavedAddressSelection(selectedOption, savedAddresses);

    setOrderLoading(true);
    try {
      const body = useSaved
        ? buildSavedAddressBody(selectedOption)
        : buildIncludedAddressBody(formData);
      await createOrder({
        isNewAddress: !useSaved,
        saveAddressToUser: useSaved ? false : saveAddressToUser,
        body,
      });
      setOutOfStockCartItemId(null);
      clearCartLocally();
      void fetchCart({ silent: true });
      navigate("/account/progress");
    } catch (err) {
      const payload = err?.response?.data;
      const parsed = parseOrderErrorPayload(payload);

      if (parsed.message) {
        setOrderError(parsed.message);
      } else if (parsed.fallback) {
        const status = err?.response?.status;
        setOrderError(
          typeof status === "number"
            ? `Something went wrong (${status}). Please try again.`
            : "Something went wrong. Please try again.",
        );
      } else {
        setOrderError("Order failed");
      }

      if (
        parsed.outOfStockItemId != null &&
        !Number.isNaN(parsed.outOfStockItemId)
      ) {
        setOutOfStockCartItemId(parsed.outOfStockItemId);
      } else {
        setOutOfStockCartItemId(null);
      }
    } finally {
      setOrderLoading(false);
    }
  }, [
    canPlaceOrder,
    formData,
    selectedOption,
    savedAddresses,
    navigate,
    fetchCart,
    clearCartLocally,
  ]);

  const value = useMemo(
    () => ({
      savedAddresses,
      addressLoading,
      placeholderValue: PLACEHOLDER,
      selectedOption,
      setSelectedOption: setSelectedOptionAndSync,
      formData,
      updateFormField,
      placeOrder,
      orderLoading,
      orderError,
      orderSuccess,
      outOfStockCartItemId,
      clearOutOfStockHighlight,
      canPlaceOrder,
    }),
    [
      savedAddresses,
      addressLoading,
      selectedOption,
      setSelectedOptionAndSync,
      formData,
      updateFormField,
      placeOrder,
      orderLoading,
      orderError,
      orderSuccess,
      outOfStockCartItemId,
      clearOutOfStockHighlight,
      canPlaceOrder,
    ],
  );

  return (
    <CheckoutAddressContext.Provider value={value}>
      {children}
    </CheckoutAddressContext.Provider>
  );
}

export function useCheckoutAddress() {
  const ctx = useContext(CheckoutAddressContext);
  if (!ctx) {
    throw new Error(
      "useCheckoutAddress must be used within CheckoutAddressProvider",
    );
  }
  return ctx;
}
