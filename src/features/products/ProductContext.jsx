import { createContext, useContext, useMemo } from "react";

const ProductContext = createContext();

export function ProductProvider({ children, initialTotalPages = 1 }) {
  const value = useMemo(
    () => ({ totalPages: initialTotalPages }),
    [initialTotalPages],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}
