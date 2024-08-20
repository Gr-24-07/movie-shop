"use client";

import { useFormStatus } from "react-dom";

export type AddButtonProps = {
    children?: React.ReactNode;
};

export default function AddButton({ children }: AddButtonProps) {
    const { pending } = useFormStatus();
    
    return(
        <button 
            type="submit" 
            className="bg-black text-white w-full rounded-lg px-4 py-3 disabled:opacity-50"
            disabled = {pending}
        >
            {pending ? "Loading..." : children ?? "Add"}
        </button>
    );
}