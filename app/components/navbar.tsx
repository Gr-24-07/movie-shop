import { auth } from "@/auth";
import AdminNavBar from "./admin-nav";
import UserNavBar from "./user-nav";
import { getCartSize } from "../actions/cart";

export default async function NavBar() {
    const session = await auth();
    const cartSize = await getCartSize();

    return (
        <nav className="flex justify-center">
            <ul className="flex gap-2">
                {session?.user.role === "ADMIN" && <AdminNavBar></AdminNavBar>}
                <UserNavBar cartSize={cartSize}></UserNavBar>
            </ul>
        </nav>
    );
}
