import Link from "next/link";

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
            <h1 className="text-3xl">MovieStore</h1>
            <NavBar></NavBar>
        </header>
    );
}

function NavBar() {
    return (
        <nav>
            <ul className="flex gap-2">
                {PAGES.map((page) => {
                    return (
                        <li key={page.key}>
                            <Link href={page.href}>{page.name}</Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
