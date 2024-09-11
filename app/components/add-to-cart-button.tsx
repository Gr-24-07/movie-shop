import { addToCart } from "../actions/cart";

type AddToCartButtonProps = {
    movieId: string;
    price: number;
    title: string;
};

export default function AddToCartbutton({
    movieId,
    price,
    title,
}: AddToCartButtonProps) {
    return (
        <form
            action={async () => {
                "use server";
                await addToCart({
                    id: movieId,
                    price: price,
                    title: title,
                });
            }}
        >
            <button className="w-full p-2 text-center font-bold bg-green-500 px-2 py-3 rounded-sm hover:bg-green-600 active:bg-green-700">
                Add To Cart
            </button>
        </form>
    );
}
