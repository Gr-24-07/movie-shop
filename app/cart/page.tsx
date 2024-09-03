import { Button } from "@/components/ui/button";
import CartTable from "./cart-table";
import Link from "next/link";
import Recommendations from "../components/recommendatios";

export default async function CartPage() {
    return (
        <div className="container space-y-6 max-w-screen-lg">
            <h1 className="text-4xl font-semibold text-center">Cart</h1>

            <CartTable></CartTable>
            <Button size={"lg"} asChild>
                <Link href="/checkout">Checkout</Link>
            </Button>

            <Recommendations></Recommendations>
        </div>
    );
}
