import { UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_PAGES: string[] = ["Home", "About"];
const DEFAULT_BUTTONS: string[] = ["Log in", "Signup"];
export default function Header({
  logo= "",
  pages = DEFAULT_PAGES,
  buttons = DEFAULT_BUTTONS,
  showLogo = true,
  user = null,
}: HeaderProps) {
  return (
    <nav className="flex justify-between p-4 border-b border-white/20 sticky top-0 z-50">
      <div className="flex flex-row items-center gap-2">
        {showLogo && logo.length > 0 && (
          <Image src={logo} alt="app logo" width={40} height={40} />
        )}
        <h1 className="text-xl font-bold tracking-tight text-white">
          Resume Analyzer
        </h1>
      </div>

      <div className="text-sm text-white-400 md:flex md:flex-row justify-between gap-4 hidden items-center">
        {pages.map((page) => (
          <Link
            key={page}
            href={`/${page.toLowerCase()}`}
            className="hover:text-gray transition-colors"
          >
            {page}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300">{user.name}</span>
            <button className="hover:opacity-80 transition-opacity">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <UserCircle className="w-8 h-8 text-gray-400" />
              )}
            </button>
          </div>
        ) : (
          <>
            {buttons.map((btn) => (
              <button
                key={btn}
                className={`text-sm px-4 py-2 rounded-lg cursor-pointer transition-all ${
                  btn === "Signup"
                    ? "bg-white text-black font-semibold hover:bg-gray-200"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {btn}
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  );
}
