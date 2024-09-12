import { auth } from "@/auth";
import SalesStatistics from "./sales-statistics";
import UserTable from "./user-table";
import { redirect } from "next/navigation";
import AccessDenied from "@/app/components/access-denied";

export default async function AdminPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/signin?next=/admin");
    }
    if (session?.user.role !== "ADMIN") {
        return <AccessDenied></AccessDenied>;
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
