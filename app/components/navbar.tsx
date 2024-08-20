"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGES = [
    { key: crypto.randomUUID(), href: "/", name: "Home" },
    {
        key: crypto.randomUUID(),
        href: "/admin/movies",
        name: "Movies",
    },
    {
        key: crypto.randomUUID(),
        href: "/admin/genres",
        name: "Genres",
    },
    {
        key: crypto.randomUUID(),
        href: "/admin/people",
        name: "People",
    },
];

export default function NavBar() {
    const path = usePathname();

    console.log(path);

    return (
        <nav className="flex justify-center">
            <ul className="flex gap-2">
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
            </ul>
        </nav>
    );
}
