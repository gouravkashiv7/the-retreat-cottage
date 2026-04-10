"use client";
import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

function ItemCard({
  item,
  isCombo = false,
  isFull = false,
  extraGuestPrice = 800,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    id,
    name,
    maxCapacity,
    regularPrice,
    discount: discountPercentage,
    image,
    description,
    type,
  } = item;

  const discount = Math.round((regularPrice * discountPercentage) / 100);
  const basePrice = regularPrice - discount;
  const finalPrice =
    type === "cabin" && isFull ? basePrice + extraGuestPrice : basePrice;

  return (
    <div className="group relative bg-primary-900/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(198,153,99,0.15)] hover:border-accent-500/30 hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-accent-500">
      {/* Image Section */}
      {image && (
        <div className="w-full aspect-[16/10] relative overflow-hidden">
          <Image
            src={image}
            alt={`${type.charAt(0).toUpperCase() + type.slice(1)} ${name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={false}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-primary-950/80 via-primary-950/20 to-transparent" />

          {/* Type Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-xl border border-white/20 bg-black/40 text-white shadow-lg">
              {type === "cabin" ? "🏡 Cabin" : "🛏️ Room"}
            </span>
          </div>

          {/* Capacity Badges */}
          {type === "cabin" && isFull && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-accent-500/80 border border-accent-500/30 text-white backdrop-blur-xl shadow-lg">
                Full Capacity
              </span>
            </div>
          )}
          {type === "cabin" && !isFull && isCombo && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/70 border border-emerald-500/30 text-white backdrop-blur-xl shadow-lg">
                Reduced Capacity
              </span>
            </div>
          )}

          {/* Price overlay on image */}
          <div className="absolute bottom-4 right-4 text-right z-10">
            <div className="bg-black/50 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/20 shadow-xl transition-transform duration-500 group-hover:scale-105">
              {discount > 0 && (
                <span className="text-xs text-primary-300 line-through block mb-0.5">
                  ₹{regularPrice}
                </span>
              )}
              <span className="text-xl sm:text-2xl font-black text-accent-400">
                ₹{finalPrice}
              </span>
              <span className="text-primary-300 text-xs font-medium ml-1">
                / night
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-5 sm:p-6 space-y-4 relative z-20">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-1 tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-accent-300 group-hover:to-accent-500 transition-all duration-500">
            {type.charAt(0).toUpperCase() + type.slice(1)} {name}
          </h3>
          {description && (
            <p className="text-primary-300/90 text-sm sm:text-base leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-2 text-primary-400">
            <UsersIcon className="h-4 w-4 text-accent-500/60" />
            <span className="text-sm font-medium">
              Up to <span className="text-white font-bold">{maxCapacity}</span>{" "}
              guests
              {type === "cabin" && isCombo && (
                <span className="ml-1 text-accent-400 text-xs font-bold">
                  ({isFull ? "3" : "2"} guests)
                </span>
              )}
            </span>
          </div>

          {/* Extra guest price info */}
          {type === "cabin" && isFull && (
            <span className="text-[10px] text-accent-500 font-bold uppercase tracking-wider">
              +₹{extraGuestPrice} extra guest
            </span>
          )}
        </div>

        {!isCombo && (
          <Link
            href={`/retreats/${type}/${id}`}
            className={`w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-linear-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-primary-950 font-black rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_15px_rgba(198,153,99,0.2)] hover:shadow-[0_8px_25px_rgba(198,153,99,0.4)] relative overflow-hidden group/btn text-sm sm:text-base ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setIsLoading(true)}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-[15deg] group-hover/btn:translate-x-[150%] transition-transform duration-1000 ease-out z-0" />
            
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-900 border-t-transparent rounded-full animate-spin relative z-10" />
                <span className="relative z-10">Loading...</span>
              </>
            ) : (
              <>
                <span className="relative z-10">Details & Booking</span>
                <ArrowRight className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-2" />
              </>
            )}
          </Link>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
