import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-row items-center justify-between">
        <h1 className="text-xl font-bold">Food Explore</h1>
        <SearchBar />
      </div>
    </nav>
  );
}