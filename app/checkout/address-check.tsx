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
    const [showAddressForm, setshowAddressForm] = useState(address === null);
    return (
        <>
            {showAddressForm ? (
                <div className="flex flex-col align-bottom w-full max-w-sm gap-4">
                    <AddressForm
                        user={user}
                        handleSubmit={() => {
                            setshowAddressForm(false);
                        }}
                    ></AddressForm>
                    {address && (
                        <Button
                            onClick={() => {
                                setshowAddressForm(false);
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
                            setshowAddressForm(true);
                        }}
                    >
                        Change Address
                    </Button>
                </div>
            )}
        </>
    );
}
