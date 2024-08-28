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
            if (session.user && token.role && token.email && token.sub) {
                session.user.role = token.role;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.id = token.sub;
            }
            return session;
        },
        jwt({ token, user, trigger, session }) {
            if (user && user.id) {
                token.id = user.id;
                token.role = user.role;
                token.name = user.name;
                token.email = user.email;
            }

            if (trigger === "update" && session?.user) {
                token.name = session.user.name;
                token.email = session.user.email;
            }
            return token;
        },
    },
});
