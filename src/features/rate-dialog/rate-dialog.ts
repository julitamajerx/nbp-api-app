import { Component, inject, effect, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TableService } from '../../services/table-service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import Chart from 'chart.js/auto';
import { RateHistory } from '../../shared/interfaces/rateHistory-interface';

@Component({
  selector: 'app-rate-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './rate-dialog.html',
  styleUrl: './rate-dialog.css',
})
export class RateDialog {
  protected data = inject(MAT_DIALOG_DATA);
  protected tableService = inject(TableService);

  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | null = null;

  constructor() {
    effect(() => {
      const history = this.tableService.currencyHistory();
      if (history && this.canvas) {
        this.createChart(history.rates);
      }
    });
  }

  createChart(rates: RateHistory[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    const sortedData = [...rates].reverse().map((r) => {
      const rawValue = r.mid ?? (r.bid && r.ask ? (r.bid + r.ask) / 2 : 0);

      const roundedValue = Number(rawValue.toFixed(4));

      return {
        date: r.effectiveDate,
        value: roundedValue,
      };
    });

    const labels = sortedData.map((d) => d.date);
    const values = sortedData.map((d) => d.value);

    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Kurs waluty (PLN)',
            data: values,
            borderColor: '#3f51b5',
            tension: 0.3,
            fill: true,
            backgroundColor: 'rgba(63, 81, 181, 0.1)',
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: (value) => `${value} PLN`,
            },
          },
        },
      },
    });
  }
}
