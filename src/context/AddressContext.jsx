import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  getAddressAPI,
  createAddressAPI,
  deleteAddressAPI,
} from "../features/account/API/addressAPI";

const AddressContext = createContext({
  address: null,
  loading: true,
  error: null,
});

export function AddressProvider({ children }) {
  const { loggedIn } = useAuth();
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAddress = async () => {
    try {
      setLoading(true);
      const addressData = await getAddressAPI();
      setAddress(addressData);
      setError(null);
    } catch (err) {
      setAddress(null);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createAddress = async (
    addressName = "",
    city,
    ZIPcode = 0,
    streetName,
    country = "",
    state = "",
    houseNumber = "",
  ) => {
    try {
      setLoading(true);
      const newAddress = await createAddressAPI(
        addressName,
        city,
        ZIPcode,
        streetName,
        country,
        state,
        houseNumber,
      );
      setAddress((prev) => [...prev, newAddress]);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      setLoading(true);
      await deleteAddressAPI(addressId);
      await fetchAddress();
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      setAddress(null);
      setLoading(false);
      return;
    }
    fetchAddress();
  }, [loggedIn]);

  return (
    <AddressContext.Provider
      value={{
        address,
        setAddress,
        loading,
        error,
        createAddress,
        fetchAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  return useContext(AddressContext);
}
