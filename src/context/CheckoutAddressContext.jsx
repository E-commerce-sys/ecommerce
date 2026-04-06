/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const CheckoutAddressContext = createContext(null);

const NEW_ADDRESS_VALUE = "new";

const CHECKOUT_ADDRESS_PLACEHOLDER = "";

const MOCK_SAVED_ADDRESSES = [
  {
    id: "1",
    labelKey: "checkout.savedAddress1",
    city: "Dallas",
    street: "1st Street",
    apartment: "47A",
  },
  {
    id: "2",
    labelKey: "checkout.savedAddress2",
    city: "Houston",
    street: "2nd Street",
    apartment: "52B",
  },
];

export function CheckoutAddressProvider({ children }) {
  const [selectedOption, setSelectedOption] = useState(
    CHECKOUT_ADDRESS_PLACEHOLDER,
  );
  const [formData, setFormData] = useState({
    city: "",
    street: "",
    apartment: "",
    saveInfo: false,
  });
  const [orderAddressError, setOrderAddressError] = useState(false);

  const clearOrderAddressError = useCallback(() => {
    setOrderAddressError(false);
  }, []);

  const isAddressComplete = useMemo(() => {
    if (selectedOption === CHECKOUT_ADDRESS_PLACEHOLDER) return false;
    if (selectedOption === NEW_ADDRESS_VALUE) {
      return (
        formData.city.trim() !== "" && formData.street.trim() !== ""
      );
    }
    return true;
  }, [selectedOption, formData.city, formData.street]);

  const setSelectedOptionAndSync = useCallback((value) => {
    clearOrderAddressError();
    setSelectedOption(value);
    if (value === CHECKOUT_ADDRESS_PLACEHOLDER) {
      setFormData((prev) => ({
        ...prev,
        city: "",
        street: "",
        apartment: "",
      }));
      return;
    }
    if (value === NEW_ADDRESS_VALUE) {
      setFormData((prev) => ({
        ...prev,
        city: "",
        street: "",
        apartment: "",
      }));
      return;
    }
    const row = MOCK_SAVED_ADDRESSES.find((a) => a.id === value);
    if (row) {
      setFormData((prev) => ({
        ...prev,
        city: row.city,
        street: row.street,
        apartment: row.apartment,
      }));
    }
  }, [clearOrderAddressError]);

  const updateFormField = useCallback(
    (e) => {
      clearOrderAddressError();
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    },
    [clearOrderAddressError],
  );

  const tryValidateAddressForOrder = useCallback(() => {
    if (!isAddressComplete) {
      setOrderAddressError(true);
      return false;
    }
    setOrderAddressError(false);
    return true;
  }, [isAddressComplete]);

  const value = useMemo(
    () => ({
      savedAddresses: MOCK_SAVED_ADDRESSES,
      placeholderValue: CHECKOUT_ADDRESS_PLACEHOLDER,
      newAddressValue: NEW_ADDRESS_VALUE,
      selectedOption,
      setSelectedOption: setSelectedOptionAndSync,
      formData,
      updateFormField,
      isAddressComplete,
      orderAddressError,
      tryValidateAddressForOrder,
      clearOrderAddressError,
    }),
    [
      selectedOption,
      setSelectedOptionAndSync,
      formData,
      updateFormField,
      isAddressComplete,
      orderAddressError,
      tryValidateAddressForOrder,
      clearOrderAddressError,
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
    throw new Error("useCheckoutAddress must be used within CheckoutAddressProvider");
  }
  return ctx;
}
