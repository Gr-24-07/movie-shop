import { ShoppingCart } from "lucide-react";

export default function CartIcon({ cartSize }: { cartSize: number }) {
    return (
        <div className="relative">
            <div className="absolute w-6 top-3 left-3 bg-red-700 rounded-full flex justify-center">
                {cartSize}
            </div>
            <ShoppingCart />
        </div>
    );
}
