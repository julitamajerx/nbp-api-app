import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { NbpTableResponse } from '../shared/interfaces/nbpTableResponse-interface';
import { GET_NBP_TABLE, GET_NBP_TABLE_FOR_CURRENCY } from '../shared/constants/urls';
import { CurrencyHistoryResponse } from '../shared/interfaces/currencyHistoryResponse-interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  public tableData = signal<NbpTableResponse[]>([]);
  public currencyHistory = signal<CurrencyHistoryResponse | null>(null);

  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  public getTable(tableLetter: 'A' | 'B' | 'C') {
    const url = GET_NBP_TABLE(tableLetter);

    this.http.get<NbpTableResponse[]>(url).subscribe({
      next: (data) => {
        this.tableData.set(data);
      },
      error: (err) => this.showError('Nie udało się pobrać tabeli kursów.'),
    });
  }

  public getTableForCurrency(tableLetter: 'A' | 'B' | 'C', currency: string) {
    const url = GET_NBP_TABLE_FOR_CURRENCY(tableLetter, currency);

    this.http.get<CurrencyHistoryResponse>(url).subscribe({
      next: (data) => {
        this.currencyHistory.set(data);
      },
      error: (err) => this.showError(`Błąd podczas pobierania historii dla ${currency}.`),
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Zamknij', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'],
    });
  }
}
