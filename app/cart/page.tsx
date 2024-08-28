import CartTable from "./cart-table";

export default async function CartPage() {
    return (
        <div className="container space-y-6 max-w-screen-lg">
            <h1 className="text-4xl font-semibold text-center">Cart</h1>

            <CartTable></CartTable>
        </div>
    );
}
