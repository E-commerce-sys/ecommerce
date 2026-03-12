import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [page, setPage] = useState(1);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [ratingSort, setRatingSort] = useState(null); // 'high' | 'low' | null
  const [totalPages, setTotalPages] = useState(1);

  return (
    <ProductContext.Provider value={{
      page, setPage,
      isDiscounted, setIsDiscounted,
      minPrice, setMinPrice,
      maxPrice, setMaxPrice,
      ratingSort, setRatingSort,
      totalPages, setTotalPages
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}