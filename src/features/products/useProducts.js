import { useEffect, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate API call
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Laptop", price: 1200 },
        { id: 2, name: "Phone", price: 800 },
        { id: 3, name: "Headphones", price: 150 },
        { id: 4, name: "Keyboard", price: 100 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return { products, loading };
}