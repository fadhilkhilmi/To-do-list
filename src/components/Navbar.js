import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 px-8 py-4 flex justify-between items-center bg-white shadow-sm">
      <span className="font-bold text-lg text-gray-800">My App</span>

      <div className="space-x-4 text-sm font-medium">
        <Link href="/" className="text-gray-600 hover:text-blue-600">
          Home
        </Link>

        <Link href="/about" className="text-gray-600 hover:text-blue-600">
          About
        </Link>
      </div>
    </nav>
  );
}
