"use client"
import Hero from "@/components/hero.component";
import UploadBox from "@/components/uploadbox.component";
import { useAuth } from "./AuthContext";

export default function Home() {
  const {isAuthenticated} = useAuth();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero/>
      <UploadBox isAuthenticated={isAuthenticated}/>
    </div>
  );
}
