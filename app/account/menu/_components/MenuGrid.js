"use client";

import { Minus, Plus, ChefHat, Clock } from "lucide-react";
import { formatCurrency, checkKitchenStatus } from "../_lib/menuUtils";

function MenuItemCard({
  item,
  inCart,
  checkedInBooking,
  setSelectedItem,
  addToCart,
  updateQty,
}) {
  const { isOpen } = checkKitchenStatus();

  return (
    <div
      onClick={() => setSelectedItem(item)}
      className="flex-1 min-w-[320px] max-w-100 group relative bg-primary-900 rounded-sm overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1 cursor-pointer items-stretch"
    >
      {/* Image */}
      {item.image && (
        <div className="relative h-48 sm:h-56 overflow-hidden bg-primary-950">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary-900 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-[0.2em] text-primary-950 bg-accent-500 px-3 py-1.5 rounded-sm shadow-md">
            {item.category}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="space-y-1.5 flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-white font-serif text-lg group-hover:text-accent-500 transition-colors leading-tight pr-4">
              {item.name}
            </h3>
            <span className="text-accent-400 font-serif text-lg tracking-tight shrink-0">
              {formatCurrency(item.price)}
            </span>
          </div>
          {item.description && (
            <p className="text-primary-400 text-xs leading-relaxed line-clamp-2">
              {item.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 mt-auto border-t border-primary-800/50">
          <div className="flex items-center gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-accent-500/40" />
             <span className="text-primary-500 text-[10px] font-black tracking-widest uppercase">
                {item.category}
             </span>
          </div>

          {checkedInBooking && (
            <div>
              {!isOpen ? (
                <div className="flex items-center gap-1.5 text-primary-600 font-bold text-[9px] uppercase tracking-widest border border-primary-800/50 px-2 py-1 rounded-sm">
                  <Clock className="w-3 h-3" />
                  Closed
                </div>
              ) : inCart ? (
                <div className="flex items-center gap-2.5 bg-primary-950 px-2.5 py-1 rounded-full border border-primary-800">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQty(item.id, -1);
                    }}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-primary-400 hover:text-accent-500 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-white font-bold text-xs w-3 text-center">
                    {inCart.quantity}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQty(item.id, 1);
                    }}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-accent-500 hover:bg-accent-500/10 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                  className="flex items-center gap-1.5 text-accent-500 hover:text-accent-400 font-black text-[10px] uppercase tracking-[2px] transition-all duration-300"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MenuGrid({
  filteredItems,
  cart,
  checkedInBooking,
  setSelectedItem,
  addToCart,
  updateQty,
  menuRef,
}) {
  return (
    <div
      ref={menuRef}
      className="px-4 sm:px-8 flex flex-wrap justify-center gap-6"
    >
      {filteredItems.length === 0 ? (
        <div className="col-span-full text-center py-32 bg-primary-900 rounded-sm border border-primary-800">
          <ChefHat className="w-12 h-12 text-accent-900 mx-auto mb-4" />
          <p className="text-primary-400 font-serif text-lg">
            No items in this curated selection.
          </p>
        </div>
      ) : (
        filteredItems.map((item) => {
          const inCart = cart.find((c) => c.menuItemId === item.id);
          return (
            <MenuItemCard
              key={item.id}
              item={item}
              inCart={inCart}
              checkedInBooking={checkedInBooking}
              setSelectedItem={setSelectedItem}
              addToCart={addToCart}
              updateQty={updateQty}
            />
          );
        })
      )}
    </div>
  );
}
