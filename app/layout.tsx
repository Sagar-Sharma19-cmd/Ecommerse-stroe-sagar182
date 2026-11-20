import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Saltline - E-Commerce Store",
  description:
    "Unit 4 EL - Project 7: E-Commerce Store (Next.js App Router, TypeScript)",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
