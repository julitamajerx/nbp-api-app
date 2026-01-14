export const GET_NBP_TABLE = (tableLetter: 'A' | 'B' | 'C') =>
  `https://api.nbp.pl/api/exchangerates/tables/${tableLetter}/?format=json`;
