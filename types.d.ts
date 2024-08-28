import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            role?: Role;
            id: string;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        role?: Role;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role?: Role;
    }
}
