"use client";

import Footer from "@/components/Footer";
import "../styles/globals.css";
import Nav from "@/components/Nav";
import { SessionProvider } from "next-auth/react";

import { usePathname } from "next/navigation";
import { Inspection } from "@/types/Inspection";
import { InspectionContext } from "@/contexts/InspectionContext";
import { useEffect, useState } from "react";
import Firebase from "@/lib/firebase";
import { LogContext } from "@/contexts/LogContext";
import { Log } from "@/types/Log";
const firebase = new Firebase();

type InspectionProviderProps = {
  children: React.ReactNode;
};

export const InspectionProvider: React.FC<InspectionProviderProps> = ({
  children,
}) => {
  //Declare contexts here (Inspections and acd from local storage)
  const [inspections, setInspections] = useState<Inspection[]>([]);

  useEffect(() => {
    if (inspections.length == 0) {
      firebase
        .getAllInspections()
        .then((data) => {
          setInspections(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <InspectionContext.Provider value={{ inspections, setInspections }}>
      {children}
    </InspectionContext.Provider>
  );
};

type LogProviderProps = {
  children: React.ReactNode;
};

export const LogProvider: React.FC<LogProviderProps> = ({ children }) => {
  //Declare contexts here (Inspections and acd from local storage)
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    if (logs.length == 0) {
      firebase
        .getAllLogs()
        .then((data) => {
          if (data == null) return;
          setLogs(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <LogContext.Provider value={{ logs, setLogs }}>
      {children}
    </LogContext.Provider>
  );
};

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
          <InspectionProvider>
            <LogProvider>
              {pathname !== "/" && <Nav />}
              <main className="">{children}</main>
              {pathname !== "/" && <Footer />}
            </LogProvider>
          </InspectionProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
