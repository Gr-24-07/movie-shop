import { Button } from "@/components/ui/button";
import { addToCart, getCart, removeFromCart } from "../actions/cart";
import { Decimal } from "@prisma/client/runtime/library";

async function handleAddAction() {
    "use server";

    await addToCart({
        id: "awdawda",
        price: new Decimal(200),
        title: "Jason Bourne",
    });
}

async function handleRemoveAction() {
    "use server";

    await removeFromCart({
        id: "awdawda",
        quantity: 2,
    });
}
export default async function CartPage() {
    const cart = await getCart();

    return (
        <div className="container space-y-6 max-w-screen-lg">
            <h1 className="text-4xl font-semibold text-center">Cart</h1>
            <pre>{JSON.stringify(cart, null, 2)}</pre>
            <form action={handleAddAction}>
                <Button>Add</Button>
            </form>
            <form action={handleRemoveAction}>
                <Button>Remove</Button>
            </form>
        </div>
    );
}
