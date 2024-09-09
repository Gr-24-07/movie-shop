"use client";

import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import SignInForm from "./sign-in-form";
import { useRouter } from "next/navigation";

export default function SignInModal({
    handleClose,
}: {
    handleClose: () => void;
}) {
    const router = useRouter();
    return createPortal(
        <div
            onClick={handleClose}
            className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0
        flex justify-center items-center"
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="bg-white p-4 h-72 w-56 rounded-md flex flex-col justify-between items-center gap-2"
            >
                <SignInForm></SignInForm>
                <Button
                    onClick={(e) => {
                        handleClose();
                    }}
                >
                    Close
                </Button>
            </div>
        </div>,
        document.body
    );
}
