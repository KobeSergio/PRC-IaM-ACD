import { Client } from "./Client";

export type Log = {
  log_id: string;
  timestamp: string;
  client_details: Client;
  author_type: string;
  author_id: string;
  author_details: any;
  action: string;
};
