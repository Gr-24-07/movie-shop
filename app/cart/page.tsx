import { getCart } from "../actions/cart";

export default async function CartPage() {
    const cart = await getCart();

    return (
        <div>
            <h1>Cart</h1>
            <pre>{JSON.stringify(cart, null, 2)}</pre>
        </div>
    );
}
