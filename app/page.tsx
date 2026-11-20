import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Everyday objects, well made</p>
          <h1 className={styles.title}>
            Calm gear for
            <br />
            focused work<span className={styles.dot}>.</span>
          </h1>
          <p className={styles.subtitle}>
            Saltline is a small demo store: browse a catalogue, search and
            filter it, open product pages, build a cart and review a checkout
            summary.
          </p>
          <div className={styles.actions}>
            <Link href="/products" className={styles.cta}>
              Shop the collection
            </Link>
            <Link href="/cart" className={styles.secondary}>
              View cart
            </Link>
          </div>
        </div>
        <div className={styles.art} aria-hidden="true">
          <span>💡</span>
          <span>⌨️</span>
          <span>🎧</span>
          <span>🖱️</span>
        </div>
      </section>

      <section className={styles.features}>
        <div>
          <h3>Dynamic product pages</h3>
          <p>Every item has its own route, with a proper not-found page.</p>
        </div>
        <div>
          <h3>Shared cart state</h3>
          <p>Add, change quantities and remove items; totals update instantly.</p>
        </div>
        <div>
          <h3>Live API catalogue</h3>
          <p>Products load from a route handler, with loading and error states.</p>
        </div>
      </section>
    </main>
  );
}
