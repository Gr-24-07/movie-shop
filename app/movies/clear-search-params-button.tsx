"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function ClearSearchParamsButton() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <Button
            onClick={() => {
                router.replace(`${pathname}`);
            }}
        >
            Clear
        </Button>
    );
}
