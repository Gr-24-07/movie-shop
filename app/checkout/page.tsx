import { auth } from "@/auth";
import CartTable from "../cart/cart-table";
import AddressForm from "./address-form";
import { notFound } from "next/navigation";
import PaymentForm from "./payment-form";
import { getCart } from "../actions/cart";

export default async function CheckoutPage() {
    const session = await auth();
    const user = session?.user;
    const cart = await getCart();

    if (!user) {
        return notFound();
    }

    return (
        <div className="container space-y-6 max-w-screen-lg">
            <h1 className="text-4xl font-semibold text-center">Checkout</h1>
            <div>
                <h1 className="text-2xl font-semibold text-center">Cart</h1>
                <CartTable></CartTable>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-semibold text-center mb-4">
                    Address
                </h1>
                <AddressForm user={user}></AddressForm>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-semibold text-center mb-4">
                    Payment
                </h1>
                <PaymentForm user={user} cart={cart}></PaymentForm>
            </div>
        </div>
    );
}
