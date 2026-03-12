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

// eslint-disable-next-line react-refresh/only-export-components
export function useProductContext() {
  return useContext(ProductContext);
}
