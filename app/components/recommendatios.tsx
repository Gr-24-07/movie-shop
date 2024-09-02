import { auth } from "@/auth";
import { getRecommendations } from "../actions/user";

export default async function Recommendations() {
    const session = await auth();
    const userId = session?.user.id || "";
    const orders = await getRecommendations(userId);

    return (
        <div>
            <pre>{JSON.stringify(orders, null, 2)}</pre>
        </div>
    );
}
