import NextAuth from "next-auth";
import { authConfig } from "@/app/_lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/account"],
};
