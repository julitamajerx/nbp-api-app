import { Rate } from './rate-interface';

export interface NbpTableResponse {
  table: string;
  no: string;
  effectiveDate: string;
  tradingDate?: string;
  rates: Rate[];
}
