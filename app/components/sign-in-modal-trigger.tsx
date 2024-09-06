"use client";

import { useState } from "react";
import SignInModal from "./sign-in-modal";
import Link from "next/link";

export default function SignInModalTrigger() {
    return (
        <>
            <Link
                className="hover:bg-white hover:text-black hover:rounded-lg p-2 text-nowrap"
                href="/signin"
            >
                Sign in
            </Link>
        </>
    );
}
