
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Bienvenido
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Accede a tu cuenta o regístrate
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Esta pantalla principal te dirige a las páginas de inicio de sesión y registro.
        </p>

        <div className="mt-8 grid gap-3">
          <Link
            href="/login"
            className="rounded-xl bg-slate-900 px-4 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
          >
            Ir a login
          </Link>

          <Link
            href="/register"
            className="rounded-xl border border-slate-300 px-4 py-3 text-center font-semibold text-slate-900 transition hover:border-sky-500 hover:text-sky-700"
          >
            Ir a register
          </Link>
        </div>
      </div>
    </main>
  );
}
