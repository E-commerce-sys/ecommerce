import { useState, useEffect } from "react";
import { bannerProductAPI } from "./API/bannerProduct";
import { bestProductAPI } from "./API/bestProduct";
import { featuredProductAPI } from "./API/featuredProduct";
import { newArrivalProductAPI } from "./API/newArrivalProduct";

function asArray(x) {
  return Array.isArray(x) ? x : [];
}

/**
 * Loads home APIs one after another (waterfall). Each piece of state updates
 * when its request finishes so sections can render progressively.
 */
export function useHomeSectionsData() {
  const [banners, setBanners] = useState(undefined);
  const [bestProducts, setBestProducts] = useState(undefined);
  const [ourProducts, setOurProducts] = useState(undefined);
  const [newArrivals, setNewArrivals] = useState(undefined);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const b = await bannerProductAPI();
        if (!cancelled) setBanners(asArray(b));
      } catch (e) {
        console.error("Home: banners failed", e);
        if (!cancelled) setBanners([]);
      }

      try {
        const bp = await bestProductAPI();
        if (!cancelled) setBestProducts(asArray(bp));
      } catch (e) {
        console.error("Home: best products failed", e);
        if (!cancelled) setBestProducts([]);
      }

      try {
        const op = await featuredProductAPI();
        if (!cancelled) setOurProducts(asArray(op));
      } catch (e) {
        console.error("Home: featured products failed", e);
        if (!cancelled) setOurProducts([]);
      }

      try {
        const na = await newArrivalProductAPI();
        if (!cancelled) setNewArrivals(asArray(na));
      } catch (e) {
        console.error("Home: new arrivals failed", e);
        if (!cancelled) setNewArrivals([]);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return { banners, bestProducts, ourProducts, newArrivals };
}
