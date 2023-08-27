import { ACD } from "./ACD";
import { Client } from "./Client";
import { OC } from "./OC";
import { PRB } from "./PRB";
import { RO } from "./RO";

export type Inspection = {
  inspection_id: string;
  inspection_task: string;
  inspection_date: string;
  inspection_mode: string;
  inspection_IMAT: string;
  inspection_VS: string;
  inspection_IMWPR: string;
  inspection_COC: string;
  inspection_TO: string;
  createdAt: string;
  fulfilledAt: string;
  prb_details: PRB;
  acd_details: ACD;
  oc_details: OC;
  client_details: Client;
  ro_details: RO;
  status: string;
};
