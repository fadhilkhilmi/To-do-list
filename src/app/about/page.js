import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="p-8 max-w-xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-green-600">Halaman About</h1>

      <p className="text-gray-600">
        Halaman ini ada hanya karena folder <code>src/app/about/page.js</code>{" "}
        dibuat.
      </p>

      <Link href="/" className="text-blue-500 hover:underline">
        Kembali ke beranda
      </Link>
    </main>
  );
}
