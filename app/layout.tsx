"use client";

import Footer from "@/components/Footer";
import "../styles/globals.css";
import Nav from "@/components/Nav";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {pathname !== "/" && <Nav />}
          <main className="">{children}</main>
          {pathname !== "/" && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}
