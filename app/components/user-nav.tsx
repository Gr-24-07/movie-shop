"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartIcon from "./cart-icon";

export default function UserNavBar({ cartSize }: { cartSize: number }) {
    const path = usePathname();

    const PAGES = [
        {
            key: crypto.randomUUID(),
            href: "/movies",
            display: "Movies",
        },
        {
            key: crypto.randomUUID(),
            href: "/cart",
            display: <CartIcon cartSize={cartSize}></CartIcon>,
        },
    ];

    return (
        <>
            {PAGES.map((page) => {
                return (
                    <li key={page.key} className="flex items-center">
                        <Link
                            className={cn(
                                "hover:bg-white hover:text-black hover:rounded-lg p-2",
                                path === page.href && "underline"
                            )}
                            href={page.href}
                        >
                            {page.display}
                        </Link>
                    </li>
                );
            })}
        </>
    );
}
