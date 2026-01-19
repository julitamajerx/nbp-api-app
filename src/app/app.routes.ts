import { Routes } from '@angular/router';
import { RateTable } from '../features/rate-table/rate-table';
import { Calculator } from '../features/calculator/calculator';

export const routes: Routes = [
  { path: 'table/:type', component: RateTable },
  { path: 'calculator', component: Calculator },
  { path: '', redirectTo: 'table/A', pathMatch: 'full' },
];
