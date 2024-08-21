"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const PAGES = [
    { key: crypto.randomUUID(), href: "/admin", name: "Dashboard" },
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

export default function AdminNavBar() {
    const path = usePathname();

    return (
        <nav className="flex justify-center">
            <ul className="flex gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 hover:bg-white hover:text-black hover:rounded-lg p-2">
                        Admin <ChevronDown size={20}></ChevronDown>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {PAGES.map((page) => {
                            return (
                                <DropdownMenuItem key={page.key}>
                                    <li className="flex items-center">
                                        <Link
                                            className={cn(
                                                "hover:bg-white hover:text-black hover:rounded-lg p-2",
                                                path === page.href &&
                                                    "underline"
                                            )}
                                            href={page.href}
                                        >
                                            {page.name}
                                        </Link>
                                    </li>
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </ul>
        </nav>
    );
}
