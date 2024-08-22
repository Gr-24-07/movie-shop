import { createPortal } from "react-dom";
import SignIn from "./sign-in";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SignInModal() {
    return createPortal(
        <div
            className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0
        flex justify-center items-center"
        >
            <div className="bg-white p-4 h-1/3 w-2/6 rounded-md flex flex-col items-center gap-2">
                <h1 className="font-bold text-center">Sign in</h1>
                <SignIn provider="google" Icon={FaGoogle}></SignIn>
                <SignIn provider="github" Icon={FaGithub}></SignIn>
            </div>
        </div>,
        document.body
    );
}
