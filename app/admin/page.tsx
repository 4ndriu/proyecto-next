"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseCliente";

interface Estudiante {
  id: string;
  nombre: string;
  correo: string;
  telefono: string | null;
}

export default function AdminPage() {

  const router = useRouter();
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");

  const fetchEstudiantes = async () => {
    const { data, error } = await supabase
      .from("estudiantes")
      .select("id, nombre, correo, telefono");

    if (error) {
      setMensaje("❌ Error al cargar usuarios: " + error.message);
    } else {
      setEstudiantes(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const confirmar = confirm("¿Seguro que quieres eliminar este usuario?");
    if (!confirmar) return;

    const { error } = await supabase
      .from("estudiantes")
      .delete()
      .eq("id", id);

    if (error) {
      setMensaje("❌ Error al eliminar: " + error.message);
    } else {
      setMensaje("✅ Usuario eliminado");
      fetchEstudiantes();
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== "admin@gmail.com") {
        router.push("/");
        return;
      }
      fetchEstudiantes();
    };
    checkAdmin();
  }, []);

  const filtrados = estudiantes.filter((e) =>
    e.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.correo?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5]">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 px-4 py-3 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-red-600 font-bold text-xl hidden sm:block">
            Pinterest
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
            Panel Admin
          </span>
          <button
            onClick={() => router.push("/")}
            className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-full text-sm font-semibold transition"
          >
            Inicio
          </button>
          <button
            onClick={handleLogout}
            className="bg-[#E60023] hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="pt-24 px-4 pb-8 max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-[32px] shadow-md p-8 mb-6">
          <div className="flex flex-col items-center">

            <div className="bg-[#E60023] w-20 h-20 rounded-full flex items-center justify-center shadow-lg mb-4">
              <span className="text-white font-bold text-3xl">A</span>
            </div>

            <h1 className="text-2xl font-bold text-black">
              Panel Administrativo
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Gestión de usuarios Pinterest
            </p>

            {/* STATS */}
            <div className="flex gap-8 mt-6 border-t pt-5 w-full justify-center">
              <div className="flex flex-col items-center">
                <span className="text-black font-bold text-2xl">
                  {estudiantes.length}
                </span>
                <span className="text-gray-500 text-xs">Usuarios totales</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-black font-bold text-2xl">
                  {estudiantes.filter((e) => e.telefono).length}
                </span>
                <span className="text-gray-500 text-xs">Con teléfono</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-black font-bold text-2xl">
                  {estudiantes.filter((e) => !e.telefono).length}
                </span>
                <span className="text-gray-500 text-xs">Sin teléfono</span>
              </div>
            </div>
          </div>
        </div>

        {/* BUSCADOR */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar usuario por nombre o correo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-full px-5 py-4 text-black placeholder:text-gray-400 outline-none focus:border-gray-500 shadow-sm"
          />
        </div>

        {/* MENSAJE */}
        {mensaje && (
          <p className="mb-4 text-center text-sm text-black bg-white rounded-2xl py-3 shadow-sm">
            {mensaje}
          </p>
        )}

        {/* LISTA USUARIOS */}
        <div className="bg-white rounded-[32px] shadow-md overflow-hidden">

          <div className="px-8 py-5 border-b">
            <h2 className="text-lg font-bold text-black">
              👥 Usuarios registrados ({filtrados.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">
              ⏳ Cargando usuarios...
            </div>
          ) : filtrados.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No se encontraron usuarios
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtrados.map((est) => (
                <div
                  key={est.id}
                  className="flex items-center justify-between px-8 py-4 hover:bg-gray-50 transition"
                >

                  {/* INFO USUARIO */}
                  <div className="flex items-center gap-4">

                    {/* AVATAR */}
                    <div className="bg-[#E60023] w-11 h-11 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-lg">
                        {est.nombre?.charAt(0).toUpperCase() ?? "U"}
                      </span>
                    </div>

                    <div>
                      <p className="text-black font-semibold text-sm">
                        {est.nombre}
                      </p>
                      <p className="text-gray-400 text-xs">{est.correo}</p>
                      {est.telefono && (
                        <p className="text-gray-400 text-xs">
                          📞 {est.telefono}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* BOTON ELIMINAR */}
                  <button
                    onClick={() => handleDelete(est.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-semibold transition"
                  >
                    Eliminar
                  </button>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}