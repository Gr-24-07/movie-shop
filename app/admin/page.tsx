import SalesStatistics from "./sales-statistics";
import UserTable from "./user-table";

export default async function AdminPage() {
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
