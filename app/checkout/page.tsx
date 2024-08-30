import { auth } from "@/auth";
import CartTable from "../cart/cart-table";
import AddressForm from "./address-form";
import { notFound } from "next/navigation";
import PaymentForm from "./payment-form";
import { getCart } from "../actions/cart";
import { getUserAddress } from "../actions/user";
import { Divide } from "lucide-react";

export default async function CheckoutPage() {
    const session = await auth();
    const user = session?.user;
    const cart = await getCart();

    if (!user) {
        return notFound();
    }

    const address = await getUserAddress(user.id);

    return (
        <div className="container space-y-6 max-w-screen-lg">
            <h1 className="text-4xl font-semibold text-center">Checkout</h1>
            <div>
                <h1 className="text-2xl font-semibold text-center">Cart</h1>
                <CartTable></CartTable>
            </div>
            <div className="flex justify-evenly gap-2">
                <div className="flex flex-col items-center border-2 p-4 w-1/2">
                    <h1 className="text-2xl font-semibold text-center mb-4">
                        Address
                    </h1>
                    {!address && (
                        <p className="">You need to enter an address</p>
                    )}
                    <AddressForm user={user}></AddressForm>
                </div>
                <div className="flex flex-col items-center border-2 p-4 w-1/2 relative">
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
