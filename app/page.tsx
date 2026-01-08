"use client";
import Hero from "@/components/hero.component";
import UploadBox from "@/components/uploadbox.component";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import AnalysisResult from "@/components/analysis.result.component";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-6 py-20 font-sans dark:bg-black">
      <div className="flex w-full max-w-6xl flex-row flex-wrap items-center justify-center">
        <Hero />
        <div className="">
          <UploadBox
            onAnalysisSuccess={(data) => setAnalysisResult(data)}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
      {analysisResult && (
        <div className="mt-20 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <AnalysisResult data={analysisResult} />
        </div>
      )}
    </div>
  );
}
