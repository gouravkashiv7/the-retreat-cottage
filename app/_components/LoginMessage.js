"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function LoginMessage() {
  const pathname = usePathname();

  return (
    <div className="w-full h-full flex items-center justify-center bg-primary-800">
      <p className="text-center text-xl py-12 text-primary-100">
        Please{" "}
        <Link
          href={`/login?callbackUrl=${pathname}`}
          className="underline text-accent-500 hover:text-accent-400 transition-colors"
        >
          login
        </Link>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
