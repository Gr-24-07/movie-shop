import { auth } from "@/auth";
import SalesStatistics from "./sales-statistics";
import UserTable from "./user-table";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("api/auth/signin");
    }
    if (session?.user.role !== "ADMIN") {
        throw new Error("Forbidden");
    }

    return (
        <div className="container space-y-6 max-w-screen-lg">
            <h1 className="text-4xl text-center font-semibold">
                Admin Dashboard
            </h1>
            <SalesStatistics></SalesStatistics>
            <UserTable></UserTable>
        </div>
    );
}
