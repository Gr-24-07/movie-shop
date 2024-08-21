import prisma from "@/lib/db";
import UserTable from "./user-table";

export default async function AdminPage() {
    const users = await prisma.user.findMany();

    return (
        <div className="container space-y-6 max-w-screen-lg">
            <h1 className="text-4xl text-center font-semibold">
                Admin Dashboard
            </h1>
            <UserTable users={users}></UserTable>
        </div>
    );
}
