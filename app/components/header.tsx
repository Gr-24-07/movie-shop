import Link from "next/link";
import SignIn from "./sign-in";
import NavBar from "./navbar";
import { auth } from "@/auth";
import SignOut from "./sign-out";
import SignInModalTrigger from "./sign-in-modal-trigger";

export default async function Header() {
    const session = await auth();

    return (
        <header className="bg-primary text-primary-foreground flex justify-between p-4">
            <h1 className="text-3xl">
                <Link href="/">MovieStore</Link>
            </h1>
            {session?.user && `${session?.user.role} ${session?.user?.name}`}
            {session?.user ? (
                <SignOut></SignOut>
            ) : (
                <SignInModalTrigger></SignInModalTrigger>
            )}
            <NavBar></NavBar>
        </header>
    );
}
