"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const outOfStock = product.stock <= 0;

  return (
    <article className={styles.card}>
      <Link href={`/products/${product.id}`} className={styles.imageLink}>
        <div className={styles.imageWrap}>
          <span className={styles.emoji}>{product.image}</span>
        </div>
      </Link>
      <div className={styles.body}>
        <p className={styles.category}>{product.category}</p>
        <Link href={`/products/${product.id}`} className={styles.name}>
          {product.name}
        </Link>
        <p className={styles.price}>₹{product.price.toLocaleString("en-IN")}</p>
        <button
          className={styles.addButton}
          disabled={outOfStock}
          onClick={() => addToCart(product)}
        >
          {outOfStock ? "Out of stock" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
