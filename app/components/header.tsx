import Link from "next/link";

import SignIn from "./sign-in";
import NavBar from "./navbar";

export default function Header() {
    return (
        <header className="bg-primary text-primary-foreground flex justify-between p-4">
            <h1 className="text-3xl">
                <Link href="/">MovieStore</Link>
            </h1>
            <SignIn></SignIn>
            <NavBar></NavBar>
        </header>
    );
}
