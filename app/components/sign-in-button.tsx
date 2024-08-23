"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { IconType } from "react-icons/lib";

export default function SignInButton({
    provider,
    Icon,
}: {
    provider: "github" | "google";
    Icon: IconType;
}) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                signIn(provider);
            }}
        >
            <Button type="submit">
                <Icon className="mr-2" />
                Sign in with {provider}
            </Button>
        </form>
    );
}
