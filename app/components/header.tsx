"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGES = [
    { key: crypto.randomUUID(), href: "/", name: "Home" },
    {
        key: crypto.randomUUID(),
        href: "/movies",
        name: "Movies",
    },
    {
        key: crypto.randomUUID(),
        href: "/genres",
        name: "Genres",
    },
    {
        key: crypto.randomUUID(),
        href: "/people",
        name: "People",
    },
];

export default function Header() {
    return (
        <header className="bg-primary text-primary-foreground flex justify-between p-4">
            <h1 className="text-3xl">
                <Link href="/">MovieStore</Link>
            </h1>
            <NavBar></NavBar>
        </header>
    );
}

function NavBar() {
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
