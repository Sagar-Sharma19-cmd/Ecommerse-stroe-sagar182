"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  ReactNode,
} from "react";
import type { Product } from "@/lib/products";

export interface CartLine {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
}

type CartAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QUANTITY"; id: string; quantity: number }
  | { type: "CLEAR" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.lines.find((l) => l.id === action.product.id);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.id === action.product.id
              ? { ...l, quantity: l.quantity + 1 }
              : l
          ),
        };
      }
      return {
        lines: [
          ...state.lines,
          {
            id: action.product.id,
            name: action.product.name,
            price: action.product.price,
            image: action.product.image,
            quantity: 1,
          },
        ],
      };
    }
    case "REMOVE":
      return { lines: state.lines.filter((l) => l.id !== action.id) };
    case "SET_QUANTITY": {
      if (action.quantity <= 0) {
        return { lines: state.lines.filter((l) => l.id !== action.id) };
      }
      return {
        lines: state.lines.map((l) =>
          l.id === action.id ? { ...l, quantity: action.quantity } : l
        ),
      };
    }
    case "CLEAR":
      return { lines: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { lines: [] });

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.lines.reduce((sum, l) => sum + l.quantity, 0);
    const subtotal = state.lines.reduce(
      (sum, l) => sum + l.quantity * l.price,
      0
    );
    return {
      lines: state.lines,
      itemCount,
      subtotal,
      addToCart: (product: Product) => dispatch({ type: "ADD", product }),
      removeFromCart: (id: string) => dispatch({ type: "REMOVE", id }),
      setQuantity: (id: string, quantity: number) =>
        dispatch({ type: "SET_QUANTITY", id, quantity }),
      clearCart: () => dispatch({ type: "CLEAR" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
