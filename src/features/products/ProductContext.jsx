/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export function ProductProvider({ children, initialTotalPages = 1 }) {
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  return (
    <ProductContext.Provider value={{ totalPages, setTotalPages }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}
