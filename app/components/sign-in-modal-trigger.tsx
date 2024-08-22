"use client";

import { useState } from "react";
import SignInModal from "./sign-in-modal";

export default function SignInModalTrigger() {
    const [showModal, setShowModal] = useState(false);

    function handleClose() {
        setShowModal(false);
    }

    return (
        <>
            <button
                onClick={() => {
                    setShowModal(true);
                }}
            >
                Sign in
            </button>
            {showModal && <SignInModal handleClose={handleClose} />}
        </>
    );
}
