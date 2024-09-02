import { auth } from "@/auth";
import AdminNavBar from "./admin-nav";
import UserNavBar from "./user-nav";
import { getCartSize } from "../actions/cart";
import { Sheet, SheetTrigger, SheetContent} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default async function NavBar() {
    const session = await auth();
    const cartSize = await getCartSize();

    return (
        <div className="container mx-auto">       
        <nav className="justify-center hidden sm:flex">
            <ul className="flex gap-2">
                {session?.user.role === "ADMIN" && <AdminNavBar></AdminNavBar>}
                <UserNavBar cartSize={cartSize}></UserNavBar>
            </ul>
        </nav>

        <nav className="block sm:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="ghost">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side = "left" className="flex flex-col gap-4">
                    <ul className="flex gap-2">
                        {session?.user.role === "ADMIN" && <AdminNavBar></AdminNavBar>}
                        <UserNavBar cartSize={cartSize}></UserNavBar>
                    </ul>
                </SheetContent>
            </Sheet>
        </nav>
        </div>
    );
}
