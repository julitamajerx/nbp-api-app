import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { NbpTableResponse } from '../shared/interfaces/nbpTableResponse-interface';
import { GET_NBP_TABLE, GET_NBP_TABLE_FOR_CURRENCY } from '../shared/constants/urls';
import { CurrencyHistoryResponse } from '../shared/interfaces/currencyHistoryResponse-interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, map } from 'rxjs';
import { CurrencyCalcItem } from '../shared/interfaces/currencyCalcItem-interface';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  public tableData = signal<NbpTableResponse[]>([]);
  public currencyHistory = signal<CurrencyHistoryResponse | null>(null);
  public allCurrencies = signal<CurrencyCalcItem[]>([]);

  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  public getTable(tableLetter: 'A' | 'B' | 'C') {
    const url = GET_NBP_TABLE(tableLetter);

    this.http.get<NbpTableResponse[]>(url).subscribe({
      next: (data) => {
        this.tableData.set(data);
      },
      error: () => this.showError('Nie udało się pobrać tabeli kursów.'),
    });
  }

  public getTableForCurrency(tableLetter: 'A' | 'B' | 'C', currency: string) {
    const url = GET_NBP_TABLE_FOR_CURRENCY(tableLetter, currency);

    this.http.get<CurrencyHistoryResponse>(url).subscribe({
      next: (data) => {
        this.currencyHistory.set(data);
      },
      error: () => this.showError(`Błąd podczas pobierania historii dla ${currency}.`),
    });
  }

  public getAllCurrencies() {
    forkJoin({
      tableA: this.http.get<NbpTableResponse[]>(GET_NBP_TABLE('A')),
      tableB: this.http.get<NbpTableResponse[]>(GET_NBP_TABLE('B')),
    })
      .pipe(
        map(({ tableA, tableB }) => {
          return [
            ...(tableA[0].rates as CurrencyCalcItem[]),
            ...(tableB[0].rates as CurrencyCalcItem[]),
          ];
        }),
      )
      .subscribe((data) => this.allCurrencies.set(data));
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
