import { User } from "next-auth";
import Image from "next/image";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import SignOut from "./sign-out";

export default function UserIcon({ user }: { user: User }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="px-3">
                <Image
                    className="hover:cursor-pointer"
                    src={user.image || ""}
                    alt=""
                    height={40}
                    width={40}
                ></Image>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/user">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SignOut></SignOut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
