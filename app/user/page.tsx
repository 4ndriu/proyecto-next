"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseCliente";

// TIPO ESTUDIANTE
interface Estudiante {
  id: string;
  nombre: string;
  correo: string;
  telefono: string | null;
}

export default function UsuarioPage() {

  // ESTADOS
  const [estudiante, setEstudiante] =
    useState<Estudiante | null>(null);

  const [nombre, setNombre] =
    useState<string>("");

  const [telefono, setTelefono] =
    useState<string>("");

  const [mensaje, setMensaje] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState<boolean>(true);

  // CARGAR ESTUDIANTE
  const fetchEstudiante = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMensaje(
        "⚠️ No hay usuario logueado"
      );
      setLoading(false);
      return;
    }

    // BUSCAR EN TABLA
    const { data, error } =
      await supabase
        .from("estudiantes")
        .select(
          "id, nombre, correo, telefono"
        )
        .eq("id", user.id)
        .single();

    if (error) {

      console.error(
        "❌ Error:",
        error.message
      );

      setMensaje(
        "❌ No se encontró el estudiante"
      );

    } else if (data) {

      setEstudiante(data);
      setNombre(data.nombre);
      setTelefono(
        data.telefono || ""
      );
    }

    setLoading(false);
  };

  // ACTUALIZAR
  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    if (!estudiante) return;

    const { error } =
      await supabase
        .from("estudiantes")
        .update({
          nombre,
          telefono,
        })
        .eq(
          "id",
          estudiante.id
        );

    if (error) {

      setMensaje(
        "❌ Error al actualizar: " +
          error.message
      );

    } else {

      setMensaje(
        "✅ Datos actualizados correctamente"
      );

      fetchEstudiante();
    }
  };

  // USE EFFECT
  useEffect(() => {
    fetchEstudiante();
  }, []);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <p className="text-black text-lg font-medium">
          ⏳ Cargando perfil...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl p-10 text-black">

        {/* LOGO */}
        <div className="flex justify-center mb-5">
          <div className="bg-[#E60023] w-16 h-16 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-3xl font-bold">
              P
            </span>
          </div>
        </div>

        {/* TITULO */}
        <h1 className="text-4xl font-bold text-center text-black mb-8">
          Mi Perfil
        </h1>

        {estudiante ? (

          <form
            onSubmit={handleUpdate}
            className="flex flex-col gap-4"
          >

            {/* NOMBRE */}
            <input
              type="text"
              value={nombre}
              onChange={(e) =>
                setNombre(
                  e.target.value
                )
              }
              placeholder="Nombre completo"
              required
              style={{ color: "black" }}
              className="border border-gray-300 rounded-2xl px-5 py-4 bg-white text-black placeholder:text-gray-500 outline-none focus:border-gray-500"
            />

            {/* TELEFONO */}
            <input
              type="text"
              value={telefono}
              onChange={(e) =>
                setTelefono(
                  e.target.value
                )
              }
              placeholder="Teléfono"
              style={{ color: "black" }}
              className="border border-gray-300 rounded-2xl px-5 py-4 bg-white text-black placeholder:text-gray-500 outline-none focus:border-gray-500"
            />

            {/* CORREO */}
            <input
              type="email"
              value={estudiante.correo}
              readOnly
              className="border border-gray-300 rounded-2xl px-5 py-4 bg-gray-100 text-gray-600"
            />

            {/* BOTON */}
            <button
              type="submit"
              className="bg-[#E60023] hover:bg-red-700 text-white py-4 rounded-full font-bold transition"
            >
              Guardar cambios
            </button>

          </form>

        ) : (

          <p className="text-center text-gray-600">
            {mensaje}
          </p>
        )}

        {/* MENSAJES */}
        {mensaje && (
          <p className="mt-5 text-center text-sm text-black">
            {mensaje}
          </p>
        )}

      </div>
    </div>
  );
}