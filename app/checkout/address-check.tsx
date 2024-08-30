"use client";

import { Button } from "@/components/ui/button";
import UserAddressDisplay, {
    Address,
} from "../components/user-address-display";
import AddressForm from "./address-form";
import { User } from "next-auth";
import { useState } from "react";

type AddressCheckProps = {
    address: Address | null;
    user: User;
};

export default function AddressCheck({ address, user }: AddressCheckProps) {
    const [hasAddress, setHasAddress] = useState(!address);
    return (
        <>
            {hasAddress ? (
                <div className="flex flex-col align-bottom w-full max-w-sm gap-4">
                    <AddressForm user={user}></AddressForm>
                    {address && (
                        <Button
                            onClick={() => {
                                setHasAddress(false);
                            }}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            ) : (
                <div className="flex flex-col align-bottom w-full max-w-sm gap-4">
                    <UserAddressDisplay
                        country={address?.country || ""}
                        city={address?.city || ""}
                        zip={address?.zip || ""}
                        address={address?.address || ""}
                    ></UserAddressDisplay>
                    <Button
                        onClick={() => {
                            setHasAddress(true);
                        }}
                    >
                        Update address
                    </Button>
                </div>
            )}
        </>
    );
}
