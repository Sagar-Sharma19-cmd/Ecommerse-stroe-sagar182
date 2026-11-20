"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const onProducts = pathname.startsWith("/products");

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <Link href="/" className={styles.brand}>
          <span className={styles.mark} aria-hidden="true" />
          Saltline
        </Link>
        <div className={styles.links}>
          <Link
            href="/products"
            className={`${styles.link} ${onProducts ? styles.active : ""}`}
          >
            Shop
          </Link>
          <Link href="/cart" className={styles.cartLink}>
            Cart
            <span className={styles.badge} aria-label={`${itemCount} items in cart`}>
              {itemCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
