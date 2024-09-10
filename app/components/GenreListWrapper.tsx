
"use client";

import dynamic from "next/dynamic";

const GenreList = dynamic(() => import("./GenreList"), { ssr: false });

export default function GenreListWrapper() {
    return <GenreList />;
}
