"use client";

import { Button } from "@/components/ui/button";
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
import { setUserAddress } from "../actions/user";
import { User } from "next-auth";

export default function AddressForm({ user }: { user: User }) {
    const [selectedCountry, setSelectedCountry] = useState("");

    console.log(user);

    return (
        <form
            action={async (formData) => {
                formData.append("country", selectedCountry);
                await setUserAddress(formData);
            }}
            className="flex flex-col gap-4 w-full max-w-sm"
        >
            <Select onValueChange={(value) => setSelectedCountry(value)}>
                <input type="hidden" name="id" value={user.id} />
                <SelectTrigger className="w-[180px]">
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
            </Select>
            <div>
                <Label htmlFor="city">City</Label>
                <Input name="city" id="city"></Input>
            </div>
            <div>
                <Label htmlFor="address">Address</Label>
                <Input name="address" id="address"></Input>
            </div>
            <div>
                <Label htmlFor="zip">Zip Code</Label>
                <Input name="zip" id="zip"></Input>
            </div>
            <Button>Save</Button>
        </form>
    );
}
