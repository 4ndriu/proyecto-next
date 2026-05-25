"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseCliente";

export default function RegisterPage() {

  // ESTADOS
  const [nombre, setNombre] =
    useState("");

  const [telefono, setTelefono] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  // REGISTER
  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setLoading(true);
    setMessage(null);

    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nombre,
            telefono,
          },
        },
      });

    if (error) {
      setMessage(
        "❌ Error: " + error.message
      );
      setLoading(false);
      return;
    }

    if (data.user) {
      setMessage(
        "✅ Cuenta creada correctamente"
      );

      setNombre("");
      setTelefono("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        window.location.href =
          "/login";
      }, 2000);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl p-10">

        {/* LOGO */}
        <div className="flex justify-center mb-5">
          <div className="bg-[#E60023] w-16 h-16 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-3xl font-bold">
              P
            </span>
          </div>
        </div>

        {/* TITULO */}
        <h1 className="text-4xl font-bold text-black text-center mb-8">
          Bienvenido a Pinterest
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4"
        >

          {/* NOMBRE */}
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) =>
              setNombre(
                e.target.value
              )
            }
            required
            className="border border-gray-300 rounded-2xl px-5 py-4 text-black placeholder:text-gray-500 outline-none focus:border-gray-500"
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
            className="border border-gray-300 rounded-2xl px-5 py-4 text-black placeholder:text-gray-500 outline-none focus:border-gray-500"
          />

          {/* TELEFONO */}
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) =>
              setTelefono(
                e.target.value
              )
            }
            className="border border-gray-300 rounded-2xl px-5 py-4 text-black placeholder:text-gray-500 outline-none focus:border-gray-500"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
            className="border border-gray-300 rounded-2xl px-5 py-4 text-black placeholder:text-gray-500 outline-none focus:border-gray-500"
          />

          {/* BOTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#E60023] hover:bg-red-700 text-white py-4 rounded-full font-bold transition"
          >
            {loading
              ? "Cargando..."
              : "Registrarse"}
          </button>
        </form>

        {/* MENSAJES */}
        {message && (
          <p className="mt-5 text-center text-black text-sm">
            {message}
          </p>
        )}

        {/* LOGIN */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="font-bold text-black hover:underline"
          >
            Inicia sesión
          </Link>
        </p>

      </div>
    </div>
  );
}