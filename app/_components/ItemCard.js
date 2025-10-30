"use client";
import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

  // Calculate base price after discount
  const basePrice = regularPrice - discount;

  // Add extra guest price if it's a cabin and isFull is true
  const finalPrice =
    type === "cabin" && isFull ? basePrice + extraGuestPrice : basePrice;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
      {image && (
        <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 relative">
          <Image
            src={image}
            alt={`${type.charAt(0).toUpperCase() + type.slice(1)} ${name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover"
            priority={false}
          />
        </div>
      )}

      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
          {type.charAt(0).toUpperCase() + type.slice(1)} {name}
          {type === "cabin" && isFull && (
            <span className="ml-2 text-sm bg-accent-500 text-primary-800 px-2 py-1 rounded-full font-medium">
              Full Capacity
            </span>
          )}
          {type === "cabin" && !isFull && isCombo && (
            <span className="ml-2 text-sm bg-green-500 text-white px-2 py-1 rounded-full font-medium">
              Reduced Capacity
            </span>
          )}
        </h3>

        {description && (
          <p className="text-gray-600 text-base sm:text-lg mb-4 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex gap-3 items-center mb-4">
          <UsersIcon className="h-5 w-5 text-primary-600" />
          <p className="text-base sm:text-lg text-gray-600">
            For up to <span className="font-bold">{maxCapacity}</span> guests
            {type === "cabin" && isCombo && (
              <span className="ml-2 text-sm text-accent-600 font-medium">
                ({isFull ? "3 guests" : "2 guests"})
              </span>
            )}
          </p>
        </div>

        <div
          className={`flex ${
            isCombo
              ? "justify-between items-center"
              : "flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0"
          }`}
        >
          <div className="flex gap-3 items-baseline sm:justify-start">
            {type === "cabin" ? (
              <span className="text-primary-600 font-medium">Starts at</span>
            ) : (
              ""
            )}{" "}
            {discount > 0 || (type === "cabin" && isFull) ? (
              <>
                <span className="text-lg sm:text-xl font-bold text-accent-600">
                  ₹{finalPrice}
                </span>
                {discount > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{regularPrice}
                  </span>
                )}
              </>
            ) : (
              <span className="text-lg sm:text-xl font-bold text-accent-600">
                ₹{finalPrice}
              </span>
            )}
            <span className="text-gray-500 text-sm sm:text-base">/ night</span>
          </div>

          {/* Extra guest price info for full capacity cabins */}
          {type === "cabin" && isFull && (
            <div className="text-xs text-accent-600 font-medium mt-1">
              +₹{extraGuestPrice} for extra guest
            </div>
          )}

          {!isCombo && (
            <Link
              href={`/retreats/${type}/${id}`}
              className={`bg-accent-500 hover:bg-accent-600 text-primary-800 py-1.5 px-3 sm:py-2 md:py-3 sm:px-4 md:px-6 rounded-lg font-semibold transition-all text-xs sm:text-sm md:text-base text-center flex items-center justify-center gap-2 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setIsLoading(true)}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-800 border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                "Details & reservation →"
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
