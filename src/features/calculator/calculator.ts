import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TableService } from '../../services/table-service';
import { CurrencyCalcItem } from '../../shared/interfaces/currencyCalcItem-interface';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-calculator',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIcon,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calculator implements OnInit {
  protected tableService = inject(TableService);
  protected allCurrencies = this.tableService.allCurrencies;
  protected result = '';
  protected showResult = false;

  protected calculatorForm = new FormGroup({
    ammountPLN: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
    ammountCurrency: new FormControl<CurrencyCalcItem | null>(null, [Validators.required]),
  });

  ngOnInit() {
    if (this.tableService.allCurrencies().length === 0) {
      this.tableService.getAllCurrencies();
    }
  }

  protected onCurrencyChange() {
    this.showResult = false;
  }

  protected calculateCurrency() {
    const { ammountPLN, ammountCurrency } = this.calculatorForm.getRawValue();

    if (ammountPLN && ammountCurrency) {
      const pln = ammountPLN;
      const rate = ammountCurrency.mid;

      const result = pln / rate;

      this.showResult = true;

      this.result = result.toFixed(2) + ' ' + ammountCurrency.code;
    }
  }
}
