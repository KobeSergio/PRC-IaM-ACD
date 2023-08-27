import { Log } from "@/types/Log";
import { createContext, useContext } from "react";

export const LogContext = createContext<
  | {
      logs: Log[];
      setLogs: React.Dispatch<React.SetStateAction<Log[]>>;
    }
  | undefined
>(undefined);

export const useLogs = () => {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error("useLogs must be used within an InspectionProvider");
  }
  return context;
};
