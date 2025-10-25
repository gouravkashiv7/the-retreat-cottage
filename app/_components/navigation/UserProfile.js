"use client";
import Link from "next/link";
import { useState } from "react";

export default function UserProfile({ session, isMobile = false, onClick }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const hasUserImage = session?.user?.image && !imageError;

  // Mobile styles
  const mobileLinkClass = hasUserImage
    ? "py-3 px-4 hover:text-accent-400 hover:bg-primary-900 rounded-lg transition-all flex items-center gap-4"
    : "block py-3 px-4 hover:text-accent-400 hover:bg-primary-900 rounded-lg transition-all";

  // Desktop styles
  const desktopLinkClass = hasUserImage
    ? "hover:text-accent-400 transition-colors flex items-center gap-4"
    : "hover:text-accent-400 transition-colors";

  const linkClass = isMobile ? mobileLinkClass : desktopLinkClass;

  const content = hasUserImage ? (
    <>
      <img
        src={session.user.image}
        className="h-8 w-8 rounded-full"
        alt={session.user.name}
        referrerPolicy="no-referrer"
        onError={handleImageError}
        loading="lazy"
      />
      <span>Guest area</span>
    </>
  ) : (
    <span>Guest area</span>
  );

  return (
    <li>
      {isMobile ? (
        <Link href="/account" className={linkClass} onClick={onClick}>
          {content}
        </Link>
      ) : (
        <Link href="/account" className={linkClass}>
          {content}
        </Link>
      )}
    </li>
  );
}
