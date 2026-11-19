"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import styles from "./products.module.css";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; products: Product[] };

export default function ProductsPage() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  // Lets a reviewer trigger the negative/unsuccessful scenario from the UI
  // itself (?fail=1 on the API route), instead of needing devtools.
  const [simulateFailure, setSimulateFailure] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    fetch(`/api/products${simulateFailure ? "?fail=1" : ""}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? `Request failed (${res.status})`);
        }
        return res.json();
      })
      .then((data: { products: Product[] }) => {
        if (!cancelled) setState({ status: "success", products: data.products });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ status: "error", message: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [simulateFailure]);

  return (
    <main className={styles.main}>
      <div className={styles.headerRow}>
        <div>
          <h1>Products</h1>
          <p className={styles.subtitle}>
            Fetched live from <code>/api/products</code>.
          </p>
        </div>
        <label className={styles.failToggle}>
          <input
            type="checkbox"
            checked={simulateFailure}
            onChange={(e) => setSimulateFailure(e.target.checked)}
          />
          Simulate API failure
        </label>
      </div>

      {state.status === "loading" && (
        <p className={styles.status} role="status">
          Loading products…
        </p>
      )}

      {state.status === "error" && (
        <div className={styles.errorBox} role="alert">
          <strong>Couldn&apos;t load products.</strong>
          <p>{state.message}</p>
        </div>
      )}

      {state.status === "success" && state.products.length === 0 && (
        <p className={styles.status}>No products available right now.</p>
      )}

      {state.status === "success" && state.products.length > 0 && (
        <div className={styles.grid}>
          {state.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
