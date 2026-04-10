"use client";
import { useState, useRef, useEffect } from "react";
import { placeOrderAction } from "@/app/_lib/actions";
import { checkKitchenStatus } from "./_lib/menuUtils";

import MenuHero from "./_components/MenuHero";
import ActiveOrdersPanel from "./_components/ActiveOrdersPanel";
import CategoryFilter from "./_components/CategoryFilter";
import MenuGrid from "./_components/MenuGrid";
import FloatingCartButton from "./_components/FloatingCartButton";
import CartSidebar from "./_components/CartSidebar";
import ItemDetailModal from "./_components/ItemDetailModal";

export default function MenuClient({
  menuItems,
  checkedInBooking,
  recentOrders,
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderMsg, setOrderMsg] = useState({ text: "", type: "" });
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const menuRef = useRef(null);

  // Lock body scroll when mobile cart is open
  useEffect(() => {
    if (showCart || selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCart, selectedItem]);

  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];
  
  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItemId === item.id);
      if (existing)
        return prev.map((c) =>
          c.menuItemId === item.id
            ? { ...c, quantity: c.quantity + 1 }
            : c,
        );
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

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.menuItemId === id
            ? { ...c, quantity: Math.max(0, c.quantity + delta) }
            : c,
        )
        .filter((c) => c.quantity > 0),
    );
  };

  const cartCount = cart.reduce((acc, c) => acc + c.quantity, 0);
  const cartTotal = cart.reduce(
    (acc, c) => acc + c.unitPrice * c.quantity,
    0,
  );

  const handlePlaceOrder = async () => {
    if (!checkedInBooking) return;
    setIsOrdering(true);
    setOrderMsg({ text: "", type: "" });
    try {
      if (!checkKitchenStatus().isOpen) {
        throw new Error("Our kitchen is currently resting. Order placement is available between 07:30 AM and 09:30 PM IST.");
      }

      const items = cart.map((c) => ({
        menuItemId: c.menuItemId,
        quantity: c.quantity,
        unitPrice: c.unitPrice,
      }));

      const result = await placeOrderAction(checkedInBooking.id, items);
      
      if (result.success) {
        setCart([]);
        setShowCart(false);
        setOrderMsg({
          text: "Delightful! Your order has been placed.",
          type: "success",
        });
        setTimeout(() => setOrderMsg({ text: "", type: "" }), 5000);
      } else {
        throw new Error(result.message || "Failed to place order");
      }
    } catch (err) {
      setOrderMsg({
        text: err.message || "Apologies, we encountered an error. Please try again.",
        type: "error",
      });
    } finally {
      setIsOrdering(false);
    }
  };

  const currentStayOrders = checkedInBooking
    ? recentOrders.filter((o) => o.bookingId === checkedInBooking.id)
    : [];
  
  return (
    <div className="relative bg-primary-950 min-h-screen text-primary-100 font-sans selection:bg-accent-500/30 flex flex-col items-center">
      {/* ── Glowing Orbs ── */}
      <div className="fixed top-[-10%] right-[-5%] w-150 h-150 bg-accent-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-[-10%] w-200 h-200 bg-accent-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* ── Main Layout Container ── */}
      <div className="relative w-full">
        <main className={`w-full max-w-7xl mx-auto space-y-6 sm:space-y-10 pb-40 md:pb-12 relative z-10 px-4 sm:px-6 md:px-8 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          cartCount > 0 && !showCart ? "pb-32" : ""
        }`}>
          <MenuHero
            checkedInBooking={checkedInBooking}
          />

        <ActiveOrdersPanel
          checkedInBooking={checkedInBooking}
          currentStayOrders={currentStayOrders}
          showOrders={showOrders}
          setShowOrders={setShowOrders}
        />

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <MenuGrid
          filteredItems={filteredItems}
          cart={cart}
          checkedInBooking={checkedInBooking}
          setSelectedItem={setSelectedItem}
          addToCart={addToCart}
          updateQty={updateQty}
          menuRef={menuRef}
        />

        <FloatingCartButton
          checkedInBooking={checkedInBooking}
          cartCount={cartCount}
          showCart={showCart}
          setShowCart={setShowCart}
          cartTotal={cartTotal}
        />

        <CartSidebar
          checkedInBooking={checkedInBooking}
          cartCount={cartCount}
          showCart={showCart}
          setShowCart={setShowCart}
          cart={cart}
          setCart={setCart}
          updateQty={updateQty}
          orderMsg={orderMsg}
          cartTotal={cartTotal}
          handlePlaceOrder={handlePlaceOrder}
          isOrdering={isOrdering}
        />

        <ItemDetailModal
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          checkedInBooking={checkedInBooking}
          cart={cart}
          updateQty={updateQty}
          addToCart={addToCart}
        />
      </main>
      </div>
    </div>
  );
}
