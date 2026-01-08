"use client";
import { register } from "@/services/auth";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const matchPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value != password) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await register({
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      });
      if (result) {
        console.log(result.message);
        router.push("/login");
      }
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
          Sign Up
        </h1>

        <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          Welcome.
        </p>

        <form className="space-y-4" onSubmit={handleRegister}>
          <p className="text-sm text-red-500 p-0 m-0">{error}</p>
          <input
            type="text"
            placeholder="First Name:"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
            className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 text-sm text-zinc-900 outline-none focus:border-black dark:border-zinc-700 dark:text-white dark:focus:border-white"
          />
          <input
            type="text"
            placeholder="Last Name:"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
            className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 text-sm text-zinc-900 outline-none focus:border-black dark:border-zinc-700 dark:text-white dark:focus:border-white"
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 text-sm text-zinc-900 outline-none focus:border-black dark:border-zinc-700 dark:text-white dark:focus:border-white"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={matchPassword}
              className="w-full rounded-lg border border-zinc-300 bg-transparent p-3 pr-10 text-sm text-zinc-900 outline-none focus:border-black dark:border-zinc-700 dark:text-white dark:focus:border-white"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <input
            type="submit"
            value="Sign up"
            className="bg-white text-black text-sm p-1 rounded-lg hover:bg-gray-200 font-demibold cursor-pointer"
          />
        </form>
      </main>
    </section>
  );
}
