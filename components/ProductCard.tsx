"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const outOfStock = product.stock <= 0;

  function handleAdd() {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <article className={styles.card}>
      <Link href={`/products/${product.id}`} className={styles.imageLink}>
        <div className={styles.imageWrap}>
          <span className={styles.emoji}>{product.image}</span>
          <span className={styles.tag}>{product.category}</span>
        </div>
      </Link>
      <div className={styles.body}>
        <Link href={`/products/${product.id}`} className={styles.name}>
          {product.name}
        </Link>
        <p className={styles.blurb}>{product.description}</p>
        <div className={styles.footer}>
          <p className={styles.price}>₹{product.price.toLocaleString("en-IN")}</p>
          <button
            className={styles.addButton}
            disabled={outOfStock}
            onClick={handleAdd}
          >
            {outOfStock ? "Out of stock" : justAdded ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
