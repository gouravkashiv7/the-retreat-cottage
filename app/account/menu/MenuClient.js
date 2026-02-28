"use client";
import { useState, useRef } from "react";
import { placeOrderAction } from "@/app/_lib/actions";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChefHat,
  Sparkles,
  Download,
} from "lucide-react";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);

function MenuClient({ menuItems, checkedInBooking, recentOrders }) {
  const [cart, setCart] = useState([]);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [orderMsg, setOrderMsg] = useState({ type: "", text: "" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const menuRef = useRef(null);

  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  // Group items by category for PDF
  const groupedItems = menuItems.reduce((acc, item) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItemId === item.id);
      if (existing) {
        return prev.map((c) =>
          c.menuItemId === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [
        ...prev,
        {
          menuItemId: item.id,
          name: item.name,
          unitPrice: item.price,
          quantity: 1,
        },
      ];
    });
  };

  const updateQty = (menuItemId, delta) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.menuItemId === menuItemId
            ? { ...c, quantity: c.quantity + delta }
            : c,
        )
        .filter((c) => c.quantity > 0),
    );
  };

  const cartTotal = cart.reduce((acc, c) => acc + c.unitPrice * c.quantity, 0);
  const cartCount = cart.reduce((acc, c) => acc + c.quantity, 0);

  const handlePlaceOrder = async () => {
    if (cart.length === 0 || !checkedInBooking) return;
    setIsOrdering(true);
    setOrderMsg({ type: "", text: "" });

    try {
      const result = await placeOrderAction(checkedInBooking.id, cart);
      if (result.success) {
        setOrderMsg({ type: "success", text: result.message });
        setCart([]);
        setShowCart(false);
      } else {
        setOrderMsg({ type: "error", text: result.message });
      }
    } catch (err) {
      setOrderMsg({
        type: "error",
        text: err.message || "Something went wrong.",
      });
    } finally {
      setIsOrdering(false);
    }
  };

  const handleDownloadMenu = async () => {
    setIsDownloading(true);
    try {
      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 40;
      let y = margin;

      const checkPage = (needed) => {
        if (y + needed > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
      };

      // Header
      pdf.setFontSize(24);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(26, 26, 46);
      pdf.text("The Retreat Cottage", pageWidth / 2, y, { align: "center" });
      y += 20;

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(136, 136, 136);
      pdf.text("Dharampur, Himachal Pradesh, India", pageWidth / 2, y, {
        align: "center",
      });
      y += 25;

      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(198, 153, 99);
      pdf.text("FOOD MENU", pageWidth / 2, y, { align: "center" });
      y += 10;

      // Line
      pdf.setDrawColor(198, 153, 99);
      pdf.setLineWidth(2);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 25;

      // Categories
      Object.entries(groupedItems).forEach(([category, items]) => {
        checkPage(40);

        // Category header
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(198, 153, 99);
        pdf.text(category.toUpperCase(), margin, y);
        y += 4;
        pdf.setDrawColor(230, 230, 230);
        pdf.setLineWidth(0.5);
        pdf.line(margin, y, pageWidth - margin, y);
        y += 14;

        items.forEach((item) => {
          checkPage(30);

          // Item name
          pdf.setFontSize(11);
          pdf.setFont("helvetica", "bold");
          pdf.setTextColor(34, 34, 34);
          pdf.text(item.name, margin, y);

          // Price
          pdf.setFont("helvetica", "bold");
          pdf.setTextColor(198, 153, 99);
          pdf.text(formatCurrency(item.price), pageWidth - margin, y, {
            align: "right",
          });
          y += 12;

          // Description
          if (item.description) {
            pdf.setFontSize(8);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(136, 136, 136);
            const lines = pdf.splitTextToSize(
              item.description,
              pageWidth - margin * 2 - 80,
            );
            pdf.text(lines, margin, y);
            y += lines.length * 10;
          }

          y += 4;
        });

        y += 10;
      });

      // Footer
      checkPage(30);
      pdf.setDrawColor(230, 230, 230);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 15;
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(170, 170, 170);
      pdf.text(
        "Prices inclusive of all taxes. Menu items subject to availability.",
        pageWidth / 2,
        y,
        { align: "center" },
      );

      pdf.save("TheRetreatCottage_Menu.pdf");
    } catch (err) {
      console.error("Menu PDF error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const statusConfig = {
    unconfirmed: {
      label: "Received",
      color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    },
    confirmed: {
      label: "Preparing",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    delivered: {
      label: "Delivered",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    cancelled: {
      label: "Cancelled",
      color: "text-red-400 bg-red-500/10 border-red-500/20",
    },
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header */}
      <div className="bg-primary-900/60 backdrop-blur-sm border border-white/5 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-accent-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
              <ChefHat className="h-3 w-3" />
              <span>Dining</span>
            </div>
            <h2 className="font-black text-2xl sm:text-3xl text-white mb-2 tracking-tight">
              Food Menu
            </h2>
            <p className="text-primary-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              {checkedInBooking
                ? "You're checked in! Browse our menu and place an order directly from here."
                : "Browse our curated menu. Orders can be placed during your checked-in stay."}
            </p>

            {checkedInBooking && (
              <div className="mt-3 inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Active Stay — Ordering Enabled
              </div>
            )}
          </div>

          {/* Download Menu Button */}
          <button
            onClick={handleDownloadMenu}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 bg-accent-500/10 hover:bg-accent-500/25 text-accent-400 border border-accent-500/20 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0 self-start"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-accent-400 border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Menu
              </>
            )}
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide animate-in fade-in slide-in-from-bottom-10 duration-700 delay-100">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300 ${
              activeCategory === cat
                ? "bg-accent-500 text-primary-950 border-accent-500 shadow-lg shadow-accent-500/20"
                : "bg-primary-900/40 text-primary-300 border-white/10 hover:bg-primary-800/60 hover:text-white hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div
        ref={menuRef}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200"
      >
        {filteredItems.length === 0 ? (
          <p className="text-primary-400 col-span-full text-center py-12">
            No items found in this category.
          </p>
        ) : (
          filteredItems.map((item, i) => {
            const inCart = cart.find((c) => c.menuItemId === item.id);
            return (
              <div
                key={item.id}
                className="group bg-primary-900/40 backdrop-blur-md border border-white/5 rounded-xl sm:rounded-2xl overflow-hidden hover:border-accent-500/30 hover:shadow-xl hover:shadow-accent-500/5 transition-all duration-500 hover:-translate-y-1 flex flex-col"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Image */}
                {item.image && (
                  <div className="relative h-32 sm:h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary-950/80 to-transparent" />
                    <span className="absolute bottom-2 left-2 sm:left-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-accent-400 bg-primary-950/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="p-3 sm:p-4 flex-1 flex flex-col">
                  <h3 className="text-white font-bold text-sm sm:text-base mb-0.5 sm:mb-1 group-hover:text-accent-300 transition-colors">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-primary-400 text-[11px] sm:text-xs leading-relaxed mb-2 sm:mb-3 line-clamp-2 flex-1">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-accent-400 font-black text-base sm:text-lg">
                      {formatCurrency(item.price)}
                    </span>

                    {checkedInBooking && (
                      <>
                        {inCart ? (
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-800 border border-white/10 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/30 transition-colors"
                            >
                              <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-300" />
                            </button>
                            <span className="text-white font-bold text-xs sm:text-sm min-w-5 sm:min-w-6 text-center">
                              {inCart.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent-500/20 border border-accent-500/30 flex items-center justify-center hover:bg-accent-500/40 transition-colors"
                            >
                              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent-400" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
                            className="flex items-center gap-1 sm:gap-1.5 bg-accent-500/10 hover:bg-accent-500/25 text-accent-400 border border-accent-500/20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all hover:scale-105"
                          >
                            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            Add
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Cart Button — Mobile */}
      {checkedInBooking && cartCount > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-20 right-6 z-40 md:hidden bg-accent-500 text-primary-950 p-3.5 rounded-full shadow-2xl shadow-accent-500/30 hover:scale-110 transition-all"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        </button>
      )}

      {/* Cart Panel */}
      {checkedInBooking && cartCount > 0 && (
        <>
          {showCart && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setShowCart(false)}
            />
          )}

          <div
            className={`fixed md:sticky bottom-0 left-0 right-0 md:bottom-auto z-50 md:z-auto transform transition-transform duration-300 md:transform-none ${
              showCart ? "translate-y-0" : "translate-y-full md:translate-y-0"
            }`}
          >
            <div className="bg-primary-950/95 md:bg-primary-900/40 backdrop-blur-xl border-t md:border border-white/10 md:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-accent-400" />
                  Your Order
                  <span className="text-[10px] sm:text-xs text-primary-400 font-normal">
                    ({cartCount} items)
                  </span>
                </h3>
                <button
                  onClick={() => {
                    setCart([]);
                    setShowCart(false);
                  }}
                  className="text-primary-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5 sm:space-y-2 max-h-32 sm:max-h-40 overflow-y-auto">
                {cart.map((c) => (
                  <div
                    key={c.menuItemId}
                    className="flex items-center justify-between text-xs sm:text-sm"
                  >
                    <span className="text-primary-200 truncate flex-1 mr-2">
                      {c.name} × {c.quantity}
                    </span>
                    <span className="text-accent-400 font-semibold whitespace-nowrap">
                      {formatCurrency(c.unitPrice * c.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-2 sm:pt-3 flex items-center justify-between">
                <span className="text-white font-bold text-sm sm:text-base">
                  Total
                </span>
                <span className="text-accent-400 font-black text-lg sm:text-xl">
                  {formatCurrency(cartTotal)}
                </span>
              </div>

              {orderMsg.text && (
                <div
                  className={`flex items-start gap-2 p-2.5 sm:p-3 rounded-xl text-[11px] sm:text-xs ${
                    orderMsg.type === "error"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}
                >
                  {orderMsg.type === "error" ? (
                    <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  )}
                  <p>{orderMsg.text}</p>
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={isOrdering}
                className="w-full bg-accent-500 hover:bg-accent-400 text-primary-950 py-2.5 sm:py-3 rounded-xl font-black text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isOrdering ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-950 border-t-transparent rounded-full animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Place Order
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Recent Orders */}
      {recentOrders && recentOrders.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <h3 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent-400" />
            Your Recent Orders
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {recentOrders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="bg-primary-900/40 backdrop-blur-md border border-white/5 rounded-xl p-3 sm:p-4 flex items-center justify-between hover:border-white/10 transition-colors gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                    <span
                      className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full border ${
                        statusConfig[order.status]?.color ||
                        "text-primary-400 bg-primary-800 border-primary-700"
                      }`}
                    >
                      {statusConfig[order.status]?.label || order.status}
                    </span>
                    <span className="text-primary-500 text-[10px] sm:text-xs">
                      {new Date(order.orderTime).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-primary-300 text-[11px] sm:text-xs truncate">
                    {order.order_items
                      ?.map(
                        (oi) =>
                          `${oi.menu_items?.name || "Item"} ×${oi.quantity}`,
                      )
                      .join(", ")}
                  </p>
                </div>
                <span className="text-accent-400 font-bold text-sm sm:text-base whitespace-nowrap">
                  {formatCurrency(order.totalPrice)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuClient;
