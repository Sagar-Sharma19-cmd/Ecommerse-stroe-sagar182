"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import styles from "./product-detail.module.css";

export default function AddToCartButton({
  product,
  disabled,
}: {
  product: Product;
  disabled: boolean;
}) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <button
      className={styles.addButton}
      disabled={disabled}
      onClick={handleClick}
    >
      {disabled ? "Out of stock" : justAdded ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
