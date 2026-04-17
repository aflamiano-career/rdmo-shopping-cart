import { useState, useEffect } from "react";
import { FALLBACK_PRODUCTS } from "../data/products";


export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) {
          setProducts(data);
          setLoading(false);
        }
      } catch (err) {
        // Graceful fallback: use embedded data so the app still works offline
        if (mounted) {
          console.warn("Using fallback product data:", err.message);
          setProducts(FALLBACK_PRODUCTS);
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  return { products, loading, error };
}
