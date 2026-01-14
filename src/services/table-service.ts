import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { NbpTableResponse } from '../shared/interfaces/nbpTableResponse-interface';
import { GET_NBP_TABLE } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  public tableData = signal<NbpTableResponse[]>([]);
  private http = inject(HttpClient);

  public getTableA(tableLetter: 'A' | 'B' | 'C') {
    const url = GET_NBP_TABLE(tableLetter);

    this.http.get<NbpTableResponse[]>(url).subscribe({
      next: (data) => {
        this.tableData.set(data);
      },
      error: (err) => console.error('Błąd NBP:', err),
    });
  }
}
