"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      router.push("/dashboard");
    } else {
      alert("Preencha email e senha (qualquer valor funciona no mock).");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-4">
      <div className="bg-white max-w-5xl w-full rounded-x4 p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Entrar</h2>

        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-4">
            <label className="block text-sm text-slate-600 mb-2">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@exemplo.com"
              className="w-full p-4 border border-zinc-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-slate-600 mb-2">Senha</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              type="password"
              className="w-full p-4 border border-zinc-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <div className="mt-6">
            <button type="submit" className="w-full px-6 py-3 bg-sky-600 text-white rounded-lg hover:opacity-95">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
