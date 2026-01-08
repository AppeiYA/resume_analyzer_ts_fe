"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login, isLoading, error } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login({ email: email, password: password });
    if (result.success) {
      router.push("/");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
          Login
        </h1>

        <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          Welcome back. Please sign in to continue.
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <p className="text-sm text-red-500 p-0 m-0">{error}</p>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 text-sm text-zinc-900 outline-none focus:border-black dark:border-zinc-700 dark:text-white dark:focus:border-white"
          />

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 pr-10 text-sm text-zinc-900 outline-none focus:border-black dark:border-zinc-700 dark:text-white dark:focus:border-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <input
            type="submit"
            value="Sign in"
            className="bg-white text-black text-sm p-1 rounded-lg hover:bg-gray-200 font-demibold cursor-pointer"
          />
        </form>
      </main>
    </section>
  );
}
