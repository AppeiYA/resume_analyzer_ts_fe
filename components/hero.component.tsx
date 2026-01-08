import Link from "next/link";
import { useAuth } from "@/app/AuthContext";

export default function Hero() {
  const { isAuthenticated } = useAuth();
  return (
    <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="max-w-lg text-5xl font-semibold tracking-tight text-black dark:text-zinc-50">
          RESUME ANALYZER POWERED BY GEMINI
        </h1>
        <p className="max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
          Upload your resume (.pdf or .docx) and have it analyzed for strengths
          and weaknesses
        </p>
        {!isAuthenticated && (
          <button className="flex w-40 items-center justify-center gap-2 rounded-full border border-black bg-white px-5 py-3 font-semibold text-black transition-all hover:bg-black hover:text-white hover:border-white active:scale-95">
            <Link href={"/login"}>Get Started</Link>
          </button>
        )}
      </div>
    </main>
  );
}
