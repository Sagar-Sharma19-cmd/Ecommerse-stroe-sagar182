"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/products" className={styles.brand}>
          Aurora<span className={styles.brandAccent}>Store</span>
        </Link>
        <div className={styles.links}>
          <Link href="/products" className={styles.link}>
            Products
          </Link>
          <Link href="/cart" className={styles.cartLink}>
            Cart
            <span className={styles.badge}>{itemCount}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
