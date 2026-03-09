import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="bg-[#cdb4db] text-[#3b2f4a] p-4 fixed w-full z-10">
      <div className="container mx-auto flex flex-row items-center justify-between">
        <Link href={"/"}><h1 className="text-xl font-bold">NutriLens</h1></Link>
        <SearchBar />
      </div>
    </nav>
  );
}