"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

export type AddButtonProps = {
    children?: React.ReactNode;
};

export default function AddButton({ children }: AddButtonProps) {
    const { pending } = useFormStatus();
    const [success, setSuccess] = useState(false);

    const handleClick = async () => {
        
        setSuccess(false);  
        try {
            
            setSuccess(true);
        } catch (error) {
           
        }
    };

    return (
        <div>
            <button
                type="submit"
                className="bg-black text-white w-full rounded-lg px-4 py-3 disabled:opacity-50"
                disabled={pending}
                onClick={handleClick}
            >
                {pending ? "Loading..." : children ?? "Add"}
            </button>
            {success && (
                <p className="text-green-800 mt-2">Genre added successfully!</p>
            )}
        </div>
    );
}
