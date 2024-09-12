import { Ban } from "lucide-react";

export default function AccessDenied() {
    return (
        <div className="container space-y-6 max-w-screen-lg">
            <Ban size={82} className="text-red-700 mx-auto" />
            <h1 className="text-4xl text-center font-semibold">
                Access Denied
            </h1>
            <p className="text-center">
                You do not have permission to view this page
            </p>
        </div>
    );
}
