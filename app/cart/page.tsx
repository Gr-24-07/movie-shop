import { Button } from "@/components/ui/button";
import { addToCart, clearCart, getCart, removeFromCart } from "../actions/cart";
import { Decimal } from "@prisma/client/runtime/library";

async function handleAddAction() {
    "use server";

    await addToCart({
        id: "awdawda",
        price: new Decimal(200),
        title: "Jason Bourne",
    });
}
async function handleAddAction2() {
    "use server";

    await addToCart({
        id: "23123",
        price: new Decimal(11),
        title: "Alien",
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
            <form action={handleAddAction2}>
                <Button>Add</Button>
            </form>
            <form action={handleRemoveAction}>
                <Button>Remove</Button>
            </form>
            <form action={clearCart}>
                <Button>Clear</Button>
            </form>
        </div>
    );
}
