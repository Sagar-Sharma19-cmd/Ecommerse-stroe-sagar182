"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import styles from "./products.module.css";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; products: Product[] };

export default function ProductsPage() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  // Lets a reviewer trigger the unsuccessful scenario from the UI itself
  // (calls /api/products?fail=1, which returns a real HTTP 500).
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    fetch(`/api/products${simulateFailure ? "?fail=1" : ""}`, {
      cache: "no-store",
    })
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
  }, [simulateFailure, reloadKey]);

  const retry = useCallback(() => {
    // Retrying turns the simulated failure off, like a recovered service.
    setSimulateFailure(false);
    setReloadKey((k) => k + 1);
  }, []);

  const categories = useMemo(() => {
    if (state.status !== "success") return ["All"];
    return ["All", ...Array.from(new Set(state.products.map((p) => p.category)))];
  }, [state]);

  const visible = useMemo(() => {
    if (state.status !== "success") return [];
    const q = query.trim().toLowerCase();
    return state.products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (q === "" ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q))
    );
  }, [state, query, category]);

  return (
    <main className={styles.main}>
      <div className={styles.headerRow}>
        <div>
          <h1>Shop</h1>
          <p className={styles.subtitle}>
            Catalogue loaded live from <code>/api/products</code>.
          </p>
        </div>

        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={simulateFailure}
            onChange={(e) => setSimulateFailure(e.target.checked)}
          />
          <span className={styles.track} aria-hidden="true">
            <span className={styles.thumb} />
          </span>
          <span className={styles.switchText}>Simulate API failure</span>
        </label>
      </div>

      <div className={styles.toolbar}>
        <input
          type="search"
          className={styles.search}
          placeholder="Search products…"
          aria-label="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={state.status !== "success"}
        />
        <div className={styles.chips} role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              className={`${styles.chip} ${c === category ? styles.chipActive : ""}`}
              onClick={() => setCategory(c)}
              aria-pressed={c === category}
              disabled={state.status !== "success"}
            >
              {c}
            </button>
          ))}
        </div>
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
          <button className={styles.retry} onClick={retry}>
            Try again
          </button>
        </div>
      )}

      {state.status === "success" && visible.length === 0 && (
        <p className={styles.status}>
          No products match your search. Try a different keyword.
        </p>
      )}

      {state.status === "success" && visible.length > 0 && (
        <>
          <p className={styles.count}>
            Showing {visible.length} of {state.products.length} products
          </p>
          <div className={styles.grid}>
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
