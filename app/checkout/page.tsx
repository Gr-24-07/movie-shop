import { auth } from "@/auth";
import CartTable from "../cart/cart-table";
import { redirect } from "next/navigation";
import PaymentForm from "./payment-form";
import { getCart } from "../actions/cart";
import { getUserAddress } from "../actions/user";

import AddressCheck from "./address-check";

export default async function CheckoutPage() {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        redirect("/signin?next=/checkout");
    }

    const cart = await getCart();
    const address = await getUserAddress(user.id);

    return (
        <div className="container space-y-6 max-w-screen-lg">
            <h1 className="text-4xl font-semibold text-center">Checkout</h1>
            <div>
                <h1 className="text-2xl font-semibold text-center">Cart</h1>
                <CartTable></CartTable>
            </div>
            <div className="flex flex-col justify-evenly gap-2 sm:flex-row">
                <div className="flex flex-col items-center border-2 p-4 sm:w-1/2">
                    <h1 className="text-2xl font-semibold text-center mb-4">
                        Address
                    </h1>
                    <AddressCheck user={user} address={address}></AddressCheck>
                </div>
                <div className="flex flex-col items-center border-2 p-4 sm:w-1/2 relative">
                    {!address && (
                        <div className="opacity-30 absolute w-full h-full bg-black top-0 left-0"></div>
                    )}
                    <h1 className="text-2xl font-semibold text-center mb-4">
                        Payment
                    </h1>
                    <PaymentForm
                        user={user}
                        cart={cart}
                        disabled={!address}
                    ></PaymentForm>
                </div>
            </div>
        </div>
    );
}
