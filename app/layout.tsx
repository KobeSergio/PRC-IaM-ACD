"use client"

import Footer from "@/components/Footer";
import "../styles/globals.css";
import Nav from "@/components/Nav";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
      {pathname !== "/" && <Nav />}
        <main className="">
          {children}
        </main>
        {pathname !== "/" && <Footer />}
      </body>
    </html>
  );
}
