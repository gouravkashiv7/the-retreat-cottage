"use client";

import { UtensilsCrossed } from "lucide-react";
import { categoryIcons } from "../_lib/menuUtils";

export default function CategoryFilter({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="sticky top-0 z-30 bg-primary-950/90 backdrop-blur-xl border-b border-primary-800/50">
      <div className="px-4 sm:px-8 py-4 flex flex-wrap gap-3 justify-center sm:justify-start">
        {categories.map((cat) => {
          const Icon = categoryIcons[cat] || UtensilsCrossed;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${
                isActive
                  ? "bg-accent-500 text-primary-950 shadow-[0_0_20px_rgba(198,153,99,0.3)]"
                  : "bg-primary-900/50 text-primary-400 hover:bg-primary-800 hover:text-white border border-primary-800/50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
