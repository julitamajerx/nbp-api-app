import { RateHistory } from './rateHistory-interface';

export interface CurrencyHistoryResponse {
  table: string;
  currency: string;
  code: string;
  rates: RateHistory[];
}
