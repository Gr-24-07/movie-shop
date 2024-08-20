import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/db";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
    callbacks: {
        session({ session, token }) {
            if (session.user && token.role) {
                session.user.role = token.role;
            }
            return session;
        },
        jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
    },
});
