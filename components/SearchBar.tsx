"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SearchBar() {
    const router = useRouter();
    const searchInputRef = useRef<HTMLInputElement>(null);

    const searchParam = useSearchParams()

    const params = new URLSearchParams();
    const pathname = usePathname();

    const handleSearch = () => {
        if(!searchInputRef.current) return;
        if(!searchInputRef.current.value.trim()) return;
        if(pathname === "/") {
            if(params.get("search") === searchInputRef.current.value.trim()) return;
            params.set("search", searchInputRef.current.value.trim());
            router.replace(`/?${params}`);
        } else
            router.push(`/?search=${searchInputRef.current.value.trim()}`);
    }

    useEffect(() => {
        if(pathname == "/") {
            const searchValue = searchParam.get("search");
            searchInputRef.current!.value = searchValue || "";
        } else {
            searchInputRef.current!.value = "";
        }
    }, [pathname]); 

    return (
        <div className="p-4 flex flex-row w-full">
            <input
                name="search"
                ref={searchInputRef}
                type="text"
                placeholder="Search for products..."
                className="w-full p-2 border rounded-lg"
            />
            <input type="submit" onClick={handleSearch} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg" value="Search" />
        </div>
    );
}