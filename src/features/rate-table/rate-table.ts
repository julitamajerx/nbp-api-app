import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableService } from '../../services/table-service';
import { Rate } from '../../shared/interfaces/rate-interface';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { RateDialog } from '../rate-dialog/rate-dialog';

@Component({
  selector: 'app-rate-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CurrencyPipe,
    DatePipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
  ],
  templateUrl: './rate-table.html',
  styleUrl: './rate-table.css',
})
export class RateTable implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  protected displayedColumns: string[] = ['currency', 'code', 'mid'];
  protected dataSource = new MatTableDataSource<Rate>();
  protected tableNo!: string;
  protected tableDate!: string;

  private tableService = inject(TableService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      const dataArray = this.tableService.tableData();
      if (dataArray && dataArray.length > 0) {
        this.dataSource.data = dataArray[0].rates;
        this.tableNo = dataArray[0].no;
        this.tableDate = dataArray[0].effectiveDate;
      }
    });
  }

  ngOnInit() {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const type = params['type'] || 'A';
      this.tableService.getTable(type);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  protected applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toUpperCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  protected openHistory(rate: Rate) {
    const tableType = this.route.snapshot.params['type'] || 'A';
    this.tableService.getTableForCurrency(tableType, rate.code);

    this.dialog.open(RateDialog, {
      data: {
        currency: rate.currency,
        code: rate.code,
        tableType: tableType,
      },
      width: '95%',
      maxWidth: '500px',
    });
  }
}
