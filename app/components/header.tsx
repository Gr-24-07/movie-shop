import Link from "next/link";
import NavBar from "./navbar";
import { auth } from "@/auth";
import SignInModalTrigger from "./sign-in-modal-trigger";
import UserIcon from "./user-icon";

export default async function Header() {
    const session = await auth();

    return (
        <header className="bg-primary text-primary-foreground flex justify-between p-4">
            <h1 className="text-3xl">
                <Link href="/">MovieStore</Link>
            </h1>

            <div className="flex gap-2">
                <NavBar></NavBar>
                {session?.user ? (
                    <UserIcon user={session.user}></UserIcon>
                ) : (
                    //
                    <SignInModalTrigger></SignInModalTrigger>
                )}
            </div>
        </header>
    );
}
