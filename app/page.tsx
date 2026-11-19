import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>Unit 4 EL - Project 7</p>
        <h1 className={styles.title}>
          AuroraStore<span className={styles.dot}>.</span>
        </h1>
        <p className={styles.subtitle}>
          A small, working e-commerce demo: browse products, open product
          detail pages, add items to a cart, and review a checkout summary.
        </p>
        <Link href="/products" className={styles.cta}>
          Browse Products
        </Link>
      </div>
    </main>
  );
}
