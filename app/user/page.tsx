import { auth } from "@/auth";
import UserDetails from "./user-details";

export default async function UserPage() {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        return <h1>No user</h1>;
    }

    return (
        <div className="container space-y-6 max-w-screen-lg">
            <UserDetails user={user}></UserDetails>

            <div>
                <h1 className="text-4xl text-center font-semibold">
                    Order History
                </h1>
            </div>
        </div>
    );
}
