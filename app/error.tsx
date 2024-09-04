"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="container space-y-6 max-w-screen-lg flex flex-col items-center">
            <h1 className="text-4xl font-semibold text-center">
                Something went wrong!
            </h1>
            <p className="text-center">{error.message}</p>

            <Button
                className="w-24"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </Button>
        </div>
    );
}
