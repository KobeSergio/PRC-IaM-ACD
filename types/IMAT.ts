import { employee } from "./Employee";
import { registeredProfessional } from "./RegisteredProfessional";

export type IMAT = {
  authorizedPersonnel: string;
  position: string;
  registeredProfessionals: registeredProfessional[];
  employees: employee[];
};
