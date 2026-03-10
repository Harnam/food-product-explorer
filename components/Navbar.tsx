"use client"

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function Navbar() {

  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <nav className="bg-[#cdb4db] text-[#3b2f4a] p-4 fixed w-full z-10">
      <div className="container mx-auto flex flex-row items-center justify-between w-full">
        {!searchOpen && <Link href={"/"}><h1 className="text-xl font-bold md:block">NutriLens</h1></Link>}
        <SearchBar open={searchOpen} setOpen={setSearchOpen} />
      </div>
    </nav>
  );
}