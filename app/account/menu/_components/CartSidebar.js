"use client";

import { Trash2, X, Minus, Plus, AlertCircle, CheckCircle2, UtensilsCrossed } from "lucide-react";
import { formatCurrency } from "../_lib/menuUtils";

export default function CartSidebar({
  checkedInBooking,
  cartCount,
  showCart,
  setShowCart,
  cart,
  setCart,
  updateQty,
  orderMsg,
  cartTotal,
  handlePlaceOrder,
  isOrdering,
}) {
  if (!checkedInBooking || cartCount === 0) return null;

  return (
    <>
      {showCart && (
        <div
          className="fixed inset-0 z-40 bg-primary-950/80 backdrop-blur-sm lg:hidden animate-in fade-in"
          onClick={() => setShowCart(false)}
        />
      )}

      <div
        className={`
          fixed inset-x-0 bottom-0 z-50 bg-primary-900/95 backdrop-blur-2xl border-t border-primary-800 flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] rounded-t-3xl max-w-2xl mx-auto
          ${
            showCart
              ? "translate-y-0 h-[85vh] opacity-100"
              : "translate-y-full h-0 opacity-0"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-primary-800 shrink-0">
          <div>
            <h3 className="text-white font-serif text-2xl">Your Order</h3>
            <p className="text-accent-500 text-[10px] font-black uppercase tracking-[0.2em] mt-0.5">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </p>
          </div>
          <div className="flex bg-primary-950 p-1 rounded-full border border-primary-800">
            <button
              onClick={() => {
                setCart([]);
                setShowCart(false);
              }}
              className="p-2 rounded-full text-primary-400 hover:text-red-400 hover:bg-red-900/30 transition-colors"
              title="Clear Order"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowCart(false)}
              className="p-2 rounded-full text-primary-400 hover:text-white hover:bg-primary-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Items */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-5">
          {cart.map((c) => (
            <div key={c.menuItemId} className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="text-white font-medium text-base pr-4">
                  {c.name}
                </span>
                <span className="text-accent-400 font-serif text-lg shrink-0">
                  {formatCurrency(c.unitPrice * c.quantity)}
                </span>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-3 bg-primary-950 px-2.5 py-1 rounded-full border border-primary-800 w-fit">
                  <button
                    onClick={() => updateQty(c.menuItemId, -1)}
                    className="text-primary-400 hover:text-accent-500 p-0.5"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-white text-xs font-bold w-4 text-center">
                    {c.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(c.menuItemId, 1)}
                    className="text-accent-500 p-0.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-primary-500 text-[10px] uppercase tracking-wider font-bold">
                  {formatCurrency(c.unitPrice)} ea
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-primary-800 bg-primary-900/50 p-5 sm:p-6 shrink-0">
          {orderMsg.text && (
            <div
              className={`px-4 py-3 rounded-sm text-[11px] font-bold flex items-center gap-2 mb-4 animate-in fade-in ${
                orderMsg.type === "error"
                  ? "bg-red-900/20 text-red-400 border border-red-900"
                  : "bg-accent-500/10 text-accent-500 border border-accent-500/20"
              }`}
            >
              {orderMsg.type === "error" ? (
                <AlertCircle className="w-4 h-4 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              )}
              {orderMsg.text}
            </div>
          )}

          <div className="flex justify-between items-end mb-6">
            <span className="text-primary-400 text-[10px] font-black uppercase tracking-[0.2em]">
              Total Estimate
            </span>
            <span className="text-accent-400 font-serif text-3xl leading-none">
              {formatCurrency(cartTotal)}
            </span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isOrdering}
            className="w-full relative overflow-hidden group bg-linear-to-r from-accent-500 to-accent-400 text-primary-950 px-8 py-5 rounded-sm font-bold text-base uppercase tracking-widest transition-all duration-300 disabled:opacity-50"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative flex items-center justify-center gap-3">
              {isOrdering ? (
                <div className="w-6 h-6 border-[3px] border-primary-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UtensilsCrossed className="w-5 h-5" />
                  Place Order
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
