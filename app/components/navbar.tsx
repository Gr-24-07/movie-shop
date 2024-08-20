import { auth } from "@/auth";
import AdminNavBar from "./admin-nav";
import UserNavBar from "./user-nav";

export default async function NavBar() {
    const session = await auth();

    return (
        <nav className="flex justify-center">
            <ul className="flex gap-2">
                {session?.user.role === "ADMIN" && <AdminNavBar></AdminNavBar>}
                <UserNavBar></UserNavBar>
            </ul>
        </nav>
    );
}
