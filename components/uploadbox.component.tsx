"use client";
import { analyzeResume } from "@/services/user";
import { UploadCloud, Lock, FileText, X, Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AnalysisProps {
  onAnalysisSuccess: (data: any) => void;
  isAuthenticated: boolean;
}

export default function UploadBox({
  onAnalysisSuccess,
  isAuthenticated,
}: AnalysisProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await analyzeResume(formData);
      onAnalysisSuccess(result.data)
    } catch (error: any) {
      setError(error?.message);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setFile(null);
  };

  return (
    <section className="flex flex-col items-center gap-4 w-full">
      <p className="text-sm text-red-500 p-0 m-0">{error}</p>
      <div
        className={`relative w-full max-w-xl rounded-xl border border-dashed p-8 text-center transition-all ${
          isAuthenticated
            ? "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950"
            : "border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
        }`}
      >
        {!isAuthenticated && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm dark:bg-black/70">
            <Lock className="mb-2 h-6 w-6 text-zinc-500" />
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
              Login required to upload resume
            </p>
            <button
              onClick={() => router.push("/login")}
              className="rounded-full bg-black px-6 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition"
            >
              Login
            </button>
          </div>
        )}

        {file ? (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className="bg-white-50 dark:bg-white/20 p-4 rounded-full mb-3">
              <FileText className="h-10 w-10 text-black dark:text-black" />
            </div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-[250px]">
              {file.name}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {(file.size / 1024).toFixed(1)} KB
            </p>

            <button
              onClick={clearFile}
              className="mt-4 flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium transition"
            >
              <X className="h-3 w-3" />
              Remove
            </button>
          </div>
        ) : (
          <div>
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center w-full cursor-pointer group ${
                !isAuthenticated ? "pointer-events-none" : ""
              }`}
            >
              <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-full group-hover:scale-110 transition-transform">
                <UploadCloud className="h-8 w-8 text-zinc-500" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
                Click to Upload your resume
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                PDF or .docx only (Max 5MB)
              </p>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.docx"
              />
            </label>
          </div>
        )}
      </div>

      <button
        disabled={!isAuthenticated || !file}
        onClick={handleAnalyze}
        className={`flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold transition-all ${
          isAuthenticated && file
            ? "bg-white text-black hover:bg-zinc-700 shadow-lg shadow-black-500/20"
            : "bg-zinc-200 text-zinc-400 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-600"
        }`}
      >
        <Wand2 className="h-4 w-4" />
        Analyze Resume
      </button>
    </section>
  );
}
