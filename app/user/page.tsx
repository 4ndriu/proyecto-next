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

export default function UsuarioPage() {

  const router = useRouter();
  const [estudiante, setEstudiante] = useState<Estudiante | null>(null);
  const [nombre, setNombre] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEstudiante = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("estudiantes")
      .select("id, nombre, correo, telefono")
      .eq("id", user.id)
      .single();

    if (error) {
      setMensaje("❌ No se encontró el estudiante");
    } else if (data) {
      setEstudiante(data);
      setNombre(data.nombre);
      setTelefono(data.telefono || "");
    }

    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!estudiante) return;

    const { error } = await supabase
      .from("estudiantes")
      .update({ nombre, telefono })
      .eq("id", estudiante.id);

    if (error) {
      setMensaje("❌ Error al actualizar: " + error.message);
    } else {
      setMensaje("✅ Datos actualizados correctamente");
      fetchEstudiante();
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    fetchEstudiante();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <p className="text-black text-lg font-medium">⏳ Cargando perfil...</p>
      </div>
    );
  }

  const inicial = nombre
    ? nombre.charAt(0).toUpperCase()
    : estudiante?.correo?.charAt(0).toUpperCase() ?? "U";

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

      {/* CONTENIDO */}
      <div className="pt-24 px-4 pb-8 max-w-2xl mx-auto">

        {/* HEADER PERFIL */}
        <div className="bg-white rounded-[32px] shadow-md p-8 mb-6 flex flex-col items-center">

          {/* AVATAR GRANDE */}
          <div className="bg-[#E60023] w-24 h-24 rounded-full flex items-center justify-center shadow-lg mb-4">
            <span className="text-white font-bold text-4xl">{inicial}</span>
          </div>

          <h1 className="text-2xl font-bold text-black">{nombre || "Usuario"}</h1>
          <p className="text-gray-500 text-sm mt-1">{estudiante?.correo}</p>

          {/* STATS estilo Pinterest */}
          <div className="flex gap-8 mt-6 border-t pt-5 w-full justify-center">
            <div className="flex flex-col items-center">
              <span className="text-black font-bold text-lg">0</span>
              <span className="text-gray-500 text-xs">Siguiendo</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-black font-bold text-lg">0</span>
              <span className="text-gray-500 text-xs">Seguidores</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-black font-bold text-lg">0</span>
              <span className="text-gray-500 text-xs">Pines</span>
            </div>
          </div>
        </div>

        {/* FORM EDITAR */}
        <div className="bg-white rounded-[32px] shadow-md p-8">

          <h2 className="text-xl font-bold text-black mb-6">
            ✏️ Editar perfil
          </h2>

          {estudiante ? (
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">

              {/* NOMBRE */}
              <div>
                <label className="text-gray-500 text-sm mb-1 block">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre completo"
                  required
                  style={{ color: "black" }}
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 bg-white text-black placeholder:text-gray-400 outline-none focus:border-gray-500"
                />
              </div>

              {/* TELEFONO */}
              <div>
                <label className="text-gray-500 text-sm mb-1 block">
                  Teléfono
                </label>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Teléfono"
                  style={{ color: "black" }}
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 bg-white text-black placeholder:text-gray-400 outline-none focus:border-gray-500"
                />
              </div>

              {/* CORREO (solo lectura) */}
              <div>
                <label className="text-gray-500 text-sm mb-1 block">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={estudiante.correo}
                  readOnly
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* BOTON */}
              <button
                type="submit"
                className="bg-[#E60023] hover:bg-red-700 text-white py-4 rounded-full font-bold transition mt-2"
              >
                Guardar cambios
              </button>

            </form>
          ) : (
            <p className="text-center text-gray-500">{mensaje}</p>
          )}

          {mensaje && (
            <p className="mt-5 text-center text-sm text-black">{mensaje}</p>
          )}

        </div>
      </div>
    </div>
  );
}