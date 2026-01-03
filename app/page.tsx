import Hero from "@/components/hero.component";
import UploadBox from "@/components/uploadbox.component";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero/>
      <UploadBox isAuthenticated={false}/>
    </div>
  );
}
