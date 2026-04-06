"use client";

import { ShoppingCart } from "lucide-react";
import { formatCurrency } from "../_lib/menuUtils";

export default function FloatingCartButton({
  checkedInBooking,
  cartCount,
  showCart,
  setShowCart,
  cartTotal,
}) {
  if (!checkedInBooking || cartCount === 0 || showCart) return null;

  return (
    <div className="fixed bottom-6 inset-x-4 z-40 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
      <button
        onClick={() => setShowCart(true)}
        className="w-full bg-linear-to-r from-accent-500 to-accent-400 text-primary-950 px-6 py-4 rounded-sm shadow-[0_10px_40px_rgba(212,175,55,0.2)] flex items-center justify-between border border-accent-200/50"
      >
        <div className="flex items-center gap-4">
          <ShoppingCart className="w-6 h-6" />
          <div className="text-left">
            <p className="font-bold uppercase tracking-widest text-xs">
              View Order
            </p>
            <p className="font-serif text-lg font-bold leading-none mt-1">
              {formatCurrency(cartTotal)}
            </p>
          </div>
        </div>
        <span className="bg-primary-950 text-accent-500 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold">
          {cartCount}
        </span>
      </button>
    </div>
  );
}
