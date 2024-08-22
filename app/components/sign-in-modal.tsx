import { createPortal } from "react-dom";
import SignIn from "./sign-in";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function SignInModal({
    handleClose,
}: {
    handleClose: () => void;
}) {
    return createPortal(
        <div
            onClick={handleClose}
            className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0
        flex justify-center items-center"
        >
            <div className="bg-white p-4 h-72 w-56 rounded-md flex flex-col justify-between items-center gap-2">
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-center">Sign in</h1>
                    <SignIn provider="google" Icon={FaGoogle}></SignIn>
                    <SignIn provider="github" Icon={FaGithub}></SignIn>
                </div>
                <Button onClick={handleClose}>Close</Button>
            </div>
        </div>,
        document.body
    );
}
