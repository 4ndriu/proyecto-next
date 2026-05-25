"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseCliente";

export default function LoginPage() {

  // ESTADOS
  const [email, setEmail] =
    useState<string>("");

  const [password, setPassword] =
    useState<string>("");

  const [message, setMessage] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState<boolean>(false);

  // LOGIN
  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setLoading(true);
    setMessage(null);

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    // ERROR
    if (error) {
      setMessage(
        "❌ Error al iniciar sesión: " +
        error.message
      );
      setLoading(false);
      return;
    }

    // LOGIN EXITOSO
    if (data.user) {

      setMessage(
        "✅ Bienvenido, sesión iniciada correctamente."
      );

      setTimeout(() => {
        window.location.href = "/user";
      }, 1500);

    } else {

      setMessage(
        "⚠️ No se encontró el usuario."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white text-black rounded-[32px] shadow-2xl p-10">

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
          Bienvenido a Pinterest
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            style={{ color: "black" }}
            className="border border-gray-300 rounded-2xl px-5 py-4 bg-white text-black placeholder:text-gray-500 outline-none focus:border-gray-500"
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
            style={{ color: "black" }}
            className="border border-gray-300 rounded-2xl px-5 py-4 bg-white text-black placeholder:text-gray-500 outline-none focus:border-gray-500"
          />

          {/* BOTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#E60023] hover:bg-red-700 text-white py-4 rounded-full font-bold transition"
          >
            {loading
              ? "Cargando..."
              : "Iniciar sesión"}
          </button>

        </form>

        {/* MENSAJE */}
        {message && (
          <p className="mt-5 text-center text-sm text-black">
            {message}
          </p>
        )}

        {/* REGISTER */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="font-bold text-black hover:underline"
          >
            Regístrate
          </Link>
        </p>

      </div>
    </div>
  );
}