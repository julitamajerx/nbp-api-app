import { Routes } from '@angular/router';
import { RateTable } from '../features/rate-table/rate-table';

export const routes: Routes = [
  { path: 'table/:type', component: RateTable },
  { path: '', redirectTo: 'table/A', pathMatch: 'full' },
];
