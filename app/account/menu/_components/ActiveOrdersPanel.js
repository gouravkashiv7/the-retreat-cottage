"use client";

import { ChevronDown } from "lucide-react";
import { formatCurrency, statusConfig } from "../_lib/menuUtils";

export default function ActiveOrdersPanel({
  checkedInBooking,
  currentStayOrders,
  showOrders,
  setShowOrders,
}) {
  if (!checkedInBooking || currentStayOrders.length === 0) return null;

  return (
    <div className="px-4 sm:px-8">
      <button
        onClick={() => setShowOrders(!showOrders)}
        className="flex items-center justify-between w-full group py-2"
      >
        <h3 className="text-white font-serif text-xl flex items-center gap-3">
          Active Orders
          <span className="text-xs font-sans font-bold text-primary-950 bg-accent-500 px-2.5 py-0.5 rounded-full">
            {currentStayOrders.length}
          </span>
        </h3>
        <ChevronDown
          className={`w-5 h-5 text-primary-400 transition-transform duration-300 ${
            showOrders ? "rotate-180" : ""
          }`}
        />
      </button>

      {showOrders && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 animate-in fade-in slide-in-from-top-4 duration-500">
          {currentStayOrders.map((order) => (
            <div
              key={order.id}
              className="bg-primary-900 border border-primary-800 rounded-sm p-5 flex flex-col gap-4 hover:bg-primary-800 transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                    Order #{order.id}
                  </p>
                  <p className="text-white font-serif text-lg">
                    {new Date(order.orderTime).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm border border-primary-800 bg-primary-900 text-primary-400">
                  {statusConfig[order.status]?.label || order.status}
                </span>
              </div>

              <div className="space-y-2 bg-primary-950 p-4 rounded-sm border border-primary-900">
                {order.order_items?.map((oi, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-primary-100">
                      {oi.menu_items?.name}{" "}
                      <span className="text-accent-500 ml-2">
                        ×{oi.quantity}
                      </span>
                    </span>
                    <span className="text-primary-400">
                      {formatCurrency(oi.unitPrice * oi.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-primary-800">
                <span className="text-primary-400 text-xs font-bold uppercase tracking-widest">
                  Total
                </span>
                <span className="text-accent-500 font-serif text-xl">
                  {formatCurrency(order.totalPrice)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
