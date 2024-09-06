"use client";

import { FaGoogle, FaGithub } from "react-icons/fa";
import SignInButton from "./sign-in-button";

export default function SignInForm() {
    return (
        <div>
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-center">Sign in</h1>
                <SignInButton provider="google" Icon={FaGoogle}></SignInButton>
                <SignInButton provider="github" Icon={FaGithub}></SignInButton>
            </div>
        </div>
    );
}
