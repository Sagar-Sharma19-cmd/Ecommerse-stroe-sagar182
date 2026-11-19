import Link from "next/link";
import styles from "./product-detail.module.css";

export default function ProductNotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.notFoundBox}>
        <h1>Product not found</h1>
        <p>We couldn&apos;t find a product with that ID.</p>
        <Link href="/products" className={styles.back}>
          &larr; Back to products
        </Link>
      </div>
    </main>
  );
}
