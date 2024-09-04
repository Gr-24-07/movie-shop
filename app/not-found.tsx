import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container space-y-6 max-w-screen-lg flex flex-col items-center">
            <h1 className="text-4xl font-semibold text-center">Not found</h1>
            <p>Oops! The page you&apos;re looking for doesn&apos;t exist</p>
            <Link href="/" className="text-blue-500 hover:underline">
                Go back to the homepage
            </Link>
        </div>
    );
}
