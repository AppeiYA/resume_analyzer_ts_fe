"use client";
import { UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
const DEFAULT_PAGES: string[] = ["Home", "About"];
const DEFAULT_BUTTONS: string[] = ["Log in", "Signup"];
export default function Header({
  logo = "",
  pages = DEFAULT_PAGES,
  buttons = DEFAULT_BUTTONS,
  showLogo = true,
  userData = null,
}: HeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  return (
    <nav className="flex justify-between p-4 border-b border-white/20 sticky top-0 z-50 bg-black">
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
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-300">{user.first_name}</span>
              <button
                onClick={() => setOpenUserDropdown(!openUserDropdown)}
                className="hover:opacity-80 transition-opacity"
              >
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

            {openUserDropdown && (
              <div className="absolute right-4 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm font-medium text-white">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>

                <button
                  onClick={() => {
                    setOpenUserDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Profile
                </button>

                <button
                  onClick={() => {
                    setOpenUserDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Settings
                </button>

                <div className="border-t border-gray-700 mt-2 pt-2">
                  <button
                    onClick={() => {
                      logout();
                      setOpenUserDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {buttons.map((btn) => (
              <button
                key={btn}
                onClick={() =>
                  router.push(btn.toLowerCase().split(" ").join(""))
                }
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
