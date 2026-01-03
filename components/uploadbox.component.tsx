"use client"
import { UploadCloud, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UploadBox({isAuthenticated}: {isAuthenticated: boolean}){
    const router = useRouter()

    return (
      <div
        className={`relative w-full max-w-xl rounded-xl border border-dashed p-8 text-center transition ${
          isAuthenticated
            ? "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950"
            : "border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
        }`}
      >
        {!isAuthenticated && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-white/80 backdrop-blur dark:bg-black/70">
            <Lock className="mb-2 h-6 w-6 text-zinc-500" />
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
              Login required to upload resume
            </p>
            <button
              onClick={() => router.push("/login")}
              className="rounded-full bg-black px-6 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Login
            </button>
          </div>
        )}

        <div
          className={`${!isAuthenticated && "pointer-events-none opacity-40"}`}
        >
          <UploadCloud className="mx-auto h-10 w-10 text-zinc-500" />
          <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
            Upload your resume
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            PDF only. Max 5MB.
          </p>
        </div>
      </div>
    );
}