export const GET_NBP_TABLE = (tableLetter: 'A' | 'B' | 'C') =>
  `https://api.nbp.pl/api/exchangerates/tables/${tableLetter}/?format=json`;

export const GET_NBP_TABLE_FOR_CURRENCY = (tableLetter: 'A' | 'B' | 'C', currency: string) =>
  `https://api.nbp.pl/api/exchangerates/rates/${tableLetter}/${currency}/last/7/?format=json`;
