import { UtensilsCrossed, ChefHat, Flame, Leaf } from "lucide-react";

export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);

export const categoryIcons = {
  All: UtensilsCrossed,
  Breakfast: ChefHat,
  Lunch: Flame,
  Dinner: Flame,
  Snacks: Leaf,
  Beverages: Leaf,
};

export const statusConfig = {
  ordered: {
    label: "Received",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    dot: "bg-amber-400",
  },
  accepted: {
    label: "Accepted",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    dot: "bg-blue-400",
  },
  preparing: {
    label: "Preparing",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    dot: "bg-purple-400",
  },
  delivered: {
    label: "Delivered",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  completed: {
    label: "Completed",
    color: "text-gray-400 bg-gray-500/10 border-gray-500/20",
    dot: "bg-gray-400",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-400 bg-red-500/10 border-red-500/20",
    dot: "bg-red-400",
  },
};

/**
 * Checks if current time is within kitchen operating hours (7:30 AM - 9:30 PM IST)
 * @returns {Object} result - { isOpen: boolean, currentIST: Date }
 */
export const checkKitchenStatus = () => {
  // Get current date/time
  const now = new Date();
  
  // Convert to IST (UTC+5.5)
  // getTime() is UTC, so we add 5.5 hours in milliseconds
  const ISTOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + ISTOffset);
  
  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();
  const timeInMinutes = hours * 60 + minutes;

  // 7:30 AM = 450 minutes
  // 9:30 PM = 21:30 = 1290 minutes
  const OPEN_TIME = 7 * 60 + 30;
  const CLOSE_TIME = 21 * 60 + 30;

  return {
    isOpen: timeInMinutes >= OPEN_TIME && timeInMinutes <= CLOSE_TIME,
    istDate
  };
};
