import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google, { type GoogleProfile } from "next-auth/providers/google";
import prisma from "@/lib/prisma";

const googleCredentials = {
  clientId: process.env.AUTH_GOOGLE_ID!,
  clientSecret: process.env.AUTH_GOOGLE_SECRET!,
  allowDangerousEmailAccountLinking: true,
};

const googleRegister = {
  ...Google(googleCredentials),
  id: "google-register",
  name: "Google Register",
};

const googleLogin = {
  ...Google(googleCredentials),
  id: "google-login",
  name: "Google Login",
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [googleRegister, googleLogin],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (!account || !profile) return false;

      const googleProfile = profile as GoogleProfile;
      const email = googleProfile.email?.toLowerCase();

      if (!email || !googleProfile.email_verified) {
        return "/register?error=unverified-email";
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (account.provider === "google-register") {
        if (existingUser) {
          return "/login?message=already-registered";
        }

        return true;
      }

      if (account.provider === "google-login") {
        if (!existingUser) {
          return "/register?error=not-registered";
        }

        return true;
      }

      return false;
    },
  },
});
