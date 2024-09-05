"use client";

import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserNavBar({ isSheet }: { isSheet?: boolean }) {
    const path = usePathname();

    const PAGES = [
        {
            key: crypto.randomUUID(),
            href: "/movies",
            display: "Movies",
        },
    ];

    if (isSheet) {
        return (
            <>
                {PAGES.map((page) => {
                    return (
                        <SheetClose key={page.key} asChild>
                            <Link
                                className={cn(
                                    "hover:bg-white hover:text-black hover:rounded-lg p-2",
                                    path === page.href && "underline"
                                )}
                                href={page.href}
                            >
                                {page.display}
                            </Link>
                        </SheetClose>
                    );
                })}
            </>
        );
    }

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
