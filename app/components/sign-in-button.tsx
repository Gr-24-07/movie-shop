"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { IconType } from "react-icons/lib";

export default function SignInButton({
    provider,
    Icon,
}: {
    provider: "github" | "google";
    Icon: IconType;
}) {
    const params = useSearchParams();
    const next = params.get("next");
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                signIn(provider, { redirect: true, callbackUrl: next || "" });
            }}
        >
            <Button type="submit" className="w-full">
                <Icon className="mr-2" />
                Sign in with {provider}
            </Button>
        </form>
    );
}
