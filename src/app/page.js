import Link from "next/link";
import TodoApp from "@/components/TodoApp";

export const metadata = {
  title: "Daftar Tugas | To-Do Next",
  description: "Aplikasi pencatatan dan pengelolaan tugas harian.",
};

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
          Daftar Tugas Harian
        </h1>

        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Catat prioritas harianmu dan selesaikan satu per satu.
        </p>
      </div>

      <TodoApp />

      <Link
        href="/about"
        className="mt-6 inline-block rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
      >
        Ke halaman About
      </Link>
    </main>
  );
}
