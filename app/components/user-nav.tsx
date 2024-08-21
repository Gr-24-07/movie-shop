"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGES = [
    {
        key: crypto.randomUUID(),
        href: "/movies",
        name: "Movies",
    },
    {
        key: crypto.randomUUID(),
        href: "/cart",
        name: "Cart",
    },
    {
        key: crypto.randomUUID(),
        href: "/checkout",
        name: "Checkout",
    },
    {
        key: crypto.randomUUID(),
        href: "/user",
        name: "User",
    },
];

export default function UserNavBar() {
    const path = usePathname();

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
                            {page.name}
                        </Link>
                    </li>
                );
            })}
        </>
    );
}
