"use client";

import { X, Minus, Plus, Clock } from "lucide-react";
import { formatCurrency, checkKitchenStatus } from "../_lib/menuUtils";

export default function ItemDetailModal({
  selectedItem,
  setSelectedItem,
  checkedInBooking,
  cart,
  updateQty,
  addToCart,
}) {
  if (!selectedItem) return null;
  const { isOpen } = checkKitchenStatus();


  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-primary-950/90 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300 p-4">
      <div className="relative bg-primary-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm border border-primary-800 shadow-2xl flex flex-col">
        <button
          onClick={() => setSelectedItem(null)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full text-primary-400 bg-primary-950/50 hover:bg-primary-950 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        {selectedItem.image && (
          <div className="w-full h-64 sm:h-80 relative shrink-0 bg-primary-950">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary-900 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-[0.2em] text-primary-950 bg-accent-500 px-3 py-1.5 rounded-sm shadow-md">
              {selectedItem.category}
            </span>
          </div>
        )}
        <div className="p-6 sm:p-8 flex flex-col gap-6 shrink-0">
          <div>
            <h3 className="text-white font-serif text-3xl sm:text-4xl leading-tight mb-4">
              {selectedItem.name}
            </h3>
            {selectedItem.description && (
              <p className="text-primary-400 text-base leading-relaxed">
                {selectedItem.description}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between pt-6 border-t border-primary-800/50">
            <span className="text-accent-400 font-serif text-3xl tracking-tight">
              {formatCurrency(selectedItem.price)}
            </span>

            {checkedInBooking && (
              <div>
                {!isOpen ? (
                   <div className="flex items-center gap-3 bg-primary-950 text-red-400 px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest border border-red-500/20">
                     <Clock className="w-4 h-4" />
                     Kitchen Closed (07:30 - 21:30 IST)
                   </div>
                ) : cart.find((c) => c.menuItemId === selectedItem.id) ? (
                  <div className="flex items-center gap-4 bg-primary-950 px-4 py-2 rounded-full border border-primary-800">
                    <button
                      onClick={() => updateQty(selectedItem.id, -1)}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-primary-400 hover:text-accent-500 hover:bg-primary-900 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-white font-bold text-lg w-6 text-center">
                      {
                        cart.find((c) => c.menuItemId === selectedItem.id)
                          .quantity
                      }
                    </span>
                    <button
                      onClick={() => updateQty(selectedItem.id, 1)}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-accent-500 hover:bg-accent-500/10 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(selectedItem)}
                    className="flex items-center gap-3 bg-primary-900 hover:bg-accent-500 text-accent-500 hover:text-primary-950 px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-widest transition-colors duration-300 border border-primary-800 hover:border-accent-500"
                  >
                    Add to Order
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
