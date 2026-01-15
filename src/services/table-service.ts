import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { NbpTableResponse } from '../shared/interfaces/nbpTableResponse-interface';
import { GET_NBP_TABLE, GET_NBP_TABLE_FOR_CURRENCY } from '../shared/constants/urls';
import { CurrencyHistoryResponse } from '../shared/interfaces/currencyHistoryResponse-interface';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  public tableData = signal<NbpTableResponse[]>([]);
  public currencyHistory = signal<CurrencyHistoryResponse | null>(null);
  private http = inject(HttpClient);

  public getTable(tableLetter: 'A' | 'B' | 'C') {
    const url = GET_NBP_TABLE(tableLetter);

    this.http.get<NbpTableResponse[]>(url).subscribe({
      next: (data) => {
        this.tableData.set(data);
      },
      error: (err) => console.error('Błąd NBP:', err),
    });
  }

  public getTableForCurrency(tableLetter: 'A' | 'B' | 'C', currency: string) {
    const url = GET_NBP_TABLE_FOR_CURRENCY(tableLetter, currency);

    this.http.get<CurrencyHistoryResponse>(url).subscribe({
      next: (data) => {
        this.currencyHistory.set(data);
      },
      error: (err) => console.error('Błąd NBP:', err),
    });
  }
}
