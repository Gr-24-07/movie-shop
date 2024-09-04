import { auth } from "@/auth";
import { redirect } from "next/navigation";
import MovieList from "../../components/admin/people/MovieList";

export default async function PeoplePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("api/auth/signin");
    }
    if (session?.user.role !== "ADMIN") {
        throw new Error("Forbidden");
    }
    return <MovieList />;
}
