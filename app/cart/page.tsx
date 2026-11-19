"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import styles from "./cart.module.css";

export default function CartPage() {
  const { lines, subtotal, setQuantity, removeFromCart, clearCart } =
    useCart();
  const [placedOrder, setPlacedOrder] = useState<null | {
    itemCount: number;
    total: number;
  }>(null);

  const shipping = lines.length > 0 ? 99 : 0;
  const total = subtotal + shipping;

  function handlePlaceOrder() {
    // No real payment processing, per the assignment's scope rule - this
    // only records a local confirmation summary.
    const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
    setPlacedOrder({ itemCount, total });
    clearCart();
  }

  if (placedOrder) {
    return (
      <main className={styles.main}>
        <div className={styles.confirmation}>
          <h1>Order placed ✓</h1>
          <p>
            {placedOrder.itemCount} item(s) confirmed, total{" "}
            <strong>₹{placedOrder.total.toLocaleString("en-IN")}</strong>.
          </p>
          <p className={styles.note}>
            This is a demo checkout — no real payment was processed.
          </p>
          <Link href="/products" className={styles.continueLink}>
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.empty}>
          <h1>Your cart is empty</h1>
          <p>Add a few products to see them here.</p>
          <Link href="/products" className={styles.continueLink}>
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1>Your Cart</h1>

      <div className={styles.layout}>
        <ul className={styles.lines}>
          {lines.map((line) => (
            <li key={line.id} className={styles.line}>
              <span className={styles.emoji}>{line.image}</span>
              <div className={styles.lineInfo}>
                <p className={styles.lineName}>{line.name}</p>
                <p className={styles.linePrice}>
                  ₹{line.price.toLocaleString("en-IN")} each
                </p>
              </div>
              <div className={styles.qtyControl}>
                <button
                  aria-label={`Decrease quantity of ${line.name}`}
                  onClick={() => setQuantity(line.id, line.quantity - 1)}
                >
                  −
                </button>
                <span>{line.quantity}</span>
                <button
                  aria-label={`Increase quantity of ${line.name}`}
                  onClick={() => setQuantity(line.id, line.quantity + 1)}
                >
                  +
                </button>
              </div>
              <p className={styles.lineTotal}>
                ₹{(line.price * line.quantity).toLocaleString("en-IN")}
              </p>
              <button
                className={styles.removeButton}
                onClick={() => removeFromCart(line.id)}
                aria-label={`Remove ${line.name} from cart`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <aside className={styles.summary}>
          <h2>Checkout Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>₹{shipping.toLocaleString("en-IN")}</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>
          <button className={styles.placeOrder} onClick={handlePlaceOrder}>
            Place Order
          </button>
        </aside>
      </div>
    </main>
  );
}
