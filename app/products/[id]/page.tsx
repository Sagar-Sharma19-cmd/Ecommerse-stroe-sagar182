import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";
import styles from "./product-detail.module.css";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  // Unknown product id -> Next.js not-found UI (app/products/[id]/not-found.tsx)
  if (!product) {
    notFound();
  }

  const outOfStock = product.stock <= 0;

  return (
    <main className={styles.main}>
      <Link href="/products" className={styles.back}>
        &larr; Back to products
      </Link>

      <div className={styles.layout}>
        <div className={styles.imageWrap}>
          <span className={styles.emoji}>{product.image}</span>
        </div>

        <div className={styles.info}>
          <p className={styles.category}>{product.category}</p>
          <h1>{product.name}</h1>
          <p className={styles.price}>
            ₹{product.price.toLocaleString("en-IN")}
          </p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.stock}>
            {outOfStock ? (
              <span className={styles.outOfStock}>Out of stock</span>
            ) : (
              <span className={styles.inStock}>
                {product.stock} in stock
              </span>
            )}
          </p>

          <AddToCartButton product={product} disabled={outOfStock} />
        </div>
      </div>
    </main>
  );
}
