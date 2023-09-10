import { Inspection } from "@/types/Inspection";
import { createContext, useContext } from "react";

export const InspectionContext = createContext<
  | {
      inspections: Inspection[];
      setInspections: React.Dispatch<React.SetStateAction<Inspection[]>>;
    }
  | undefined
>(undefined);

export const useInspections = () => {
  const context = useContext(InspectionContext);
  if (!context) {
    throw new Error("useInspections must be used within an InspectionProvider");
  }
  return context;
};
