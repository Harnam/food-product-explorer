"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export default function SearchBar({ open, setOpen }: Props) {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLInputElement>(null);

  const searchParam = useSearchParams();

  const params = new URLSearchParams();
  const pathname = usePathname();

  const handleSubmit = (e: React.SubmitEvent) => {
    console.log("search");
    e.preventDefault();
    if (!searchInputRef.current) return;
    const query = searchInputRef.current.value.trim();
    if (!query) return;
    const isBarcode = /^\d{8,}$/.test(query);

    if (isBarcode) {
      router.push(`/product/${query}`);
    } else {
      if (pathname === "/") {
        if (params.get("search") === searchInputRef.current.value.trim())
          return;
        params.set("search", searchInputRef.current.value.trim());
        router.replace(`/?${params}`);
      } else router.push(`/?search=${searchInputRef.current.value.trim()}`);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (pathname == "/") {
      const searchValue = searchParam.get("search");
      searchInputRef.current!.value = searchValue || "";
    } else {
      searchInputRef.current!.value = "";
    }
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [setOpen]);

  // close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent | TouchEvent) {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [setOpen]);

  return (
    <div
      ref={ref}
      className={"flex items-center ml-auto " + (open ? "w-full" : "md:w-full")}
    >
      {/* Mobile icon when closed */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className={`p-2 md:hidden`}
          aria-label="Search"
        >
          🔍
        </button>
      )}

      {/* Search field */}
      <form
        onSubmit={handleSubmit}
        className={`flex items-center border rounded-md bg-white overflow-hidden transition-all duration-300
        ${open ? "w-full ml-2" : "w-0 md:w-full md:ml-2"}`}
      >
        <input
          autoFocus={open}
          ref={searchInputRef}
          placeholder="Search products or barcode..."
          className="flex-1 px-3 py-2 outline-none text-sm"
        />

        <button type="submit" className="px-3 text-gray-600 hover:text-black">
          🔍
        </button>
      </form>
    </div>
  );
}
