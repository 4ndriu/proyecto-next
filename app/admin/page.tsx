// app/admin/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseCliente";

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-red-500 bg-red-600 flex items-center justify-center">
            <span className="text-white font-bold text-4xl">A</span>
          </div>
          <h1 className="text-2xl font-bold mt-4 text-black">Administrador</h1>
          <p className="text-gray-500">admin@gmail.com</p>
          <span className="mt-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
            Admin
          </span>
        </div>

        <div className="mt-6 space-y-4">
          <div className="border rounded-lg p-3">
            <p className="text-gray-400 text-sm">Nombre</p>
            <p className="font-semibold text-black">Administrador Pinterest</p>
          </div>
          <div className="border rounded-lg p-3">
            <p className="text-gray-400 text-sm">Correo</p>
            <p className="font-semibold text-black">admin@gmail.com</p>
          </div>
          <div className="border rounded-lg p-3">
            <p className="text-gray-400 text-sm">Rol</p>
            <p className="font-semibold text-black">Administrador del Sistema</p>
          </div>
          <div className="border rounded-lg p-3">
            <p className="text-gray-400 text-sm">Total usuarios</p>
            <p className="font-semibold text-black">Gestión de estudiantes</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => router.push("/")}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-semibold"
          >
            Ver Home
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300 font-semibold"
          >
            Cerrar Sesión
          </button>
        </div>

      </div>
    </div>
  );
}