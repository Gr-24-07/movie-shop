import { auth } from "@/auth";
import CartTable from "../cart/cart-table";
import AddressForm from "./address-form";
import { notFound } from "next/navigation";

export default async function CheckoutPage() {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        return notFound();
    }

    return (
        <div className="container space-y-6 max-w-screen-lg">
            <h1 className="text-4xl font-semibold text-center">Checkout</h1>
            <CartTable></CartTable>
            <h1 className="text-4xl font-semibold text-center">Address</h1>
            <AddressForm user={user}></AddressForm>
        </div>
    );
}
