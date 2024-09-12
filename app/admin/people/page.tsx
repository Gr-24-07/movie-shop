import { auth } from "@/auth";
import { redirect } from "next/navigation";
import MovieList from "../../components/admin/people/MovieList";
import AccessDenied from "@/app/components/access-denied";

export default async function PeoplePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/signin?next=/admin/people");
    }
    if (session?.user.role !== "ADMIN") {
        return <AccessDenied></AccessDenied>;
    }
    return <MovieList />;
}
