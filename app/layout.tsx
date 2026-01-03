import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header.component";
import { AuthProvider } from "./AuthContext";

const metadata: Metadata = {
  title: "Resume Analyzer",
  description: "Analyze your resume and prepare to bag the biggest jobs",
};

const NAV_PAGES = ["Home", "Features", "About"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AuthProvider>
          <Header logo={""} showLogo={true} />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
