"use client";

import dynamic from "next/dynamic";

const GenreList = dynamic(() => import("./genre-list"), { ssr: false });

export default function GenreListWrapper() {
    return <GenreList />;
}