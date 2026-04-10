import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { createGuest, getGuest } from "./data-service";

const authOptions = {
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getGuest(user.email);

        if (!existingUser) {
          await createGuest({
            email: user.email,
            fullName: user.name,
            image: user.image,
          });

          // Use dynamic import to prevent Node.js modules from being loaded in the Edge runtime (middleware)
          const { sendWelcomeEmail } = await import("./mail");
          sendWelcomeEmail(user.email, user.name).catch((err) =>
            console.error("Welcome email failed:", err),
          );
        } else if (existingUser.image !== user.image) {
          // Update image if it has changed or was missing
          const { updateGuest } = await import("./data-service");
          await updateGuest(existingUser.id, { image: user.image });
        }

        return true;
      } catch (error) {
        console.error("Sign in callback error:", error);
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authOptions);
