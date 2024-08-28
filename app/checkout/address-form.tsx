"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import countries from "@/countries.json";
import { useState } from "react";
import { setUserAddress, SetUserAddressFail } from "../actions/user";
import { User } from "next-auth";
import FormError from "../components/form-error";
import SubmitButton from "../components/submit-button";

export default function AddressForm({ user }: { user: User }) {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [errors, setErrors] = useState<SetUserAddressFail["errors"] | null>();
    const [toast, setToast] = useState("");

    return (
        <form
            action={async (formData) => {
                formData.append("country", selectedCountry);
                const res = await setUserAddress(formData);

                if (!res.success) {
                    setErrors(res.errors);
                } else {
                    setErrors(null);
                    setToast("Address was successfully saved");
                }
            }}
            className="flex flex-col gap-4 w-full max-w-sm"
        >
            <Select onValueChange={(value) => setSelectedCountry(value)}>
                <input type="hidden" name="id" value={user.id} />
                <SelectTrigger>
                    <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {countries.map((country) => {
                            return (
                                <SelectItem
                                    key={country.countryCode}
                                    value={country.country}
                                >
                                    {`${country.country} ${country.flag}`}
                                </SelectItem>
                            );
                        })}
                    </SelectGroup>
                </SelectContent>
                <FormError errors={errors?.country?._errors}></FormError>
            </Select>
            <div>
                <Label htmlFor="city">City</Label>
                <Input name="city" id="city"></Input>
                <FormError errors={errors?.city?._errors}></FormError>
            </div>
            <div>
                <Label htmlFor="address">Address</Label>
                <Input name="address" id="address"></Input>
                <FormError errors={errors?.address?._errors}></FormError>
            </div>
            <div>
                <Label htmlFor="zip">Zip Code</Label>
                <Input name="zip" id="zip"></Input>
                <FormError errors={errors?.zip?._errors}></FormError>
            </div>
            <SubmitButton>Save</SubmitButton>
            {toast && <p className="text-green-500 text-center">{toast}</p>}
        </form>
    );
}
