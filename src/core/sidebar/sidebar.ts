import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTree } from '@angular/material/tree';
import { TABLE_CATEGORIES } from '../../shared/constants/tableCategories';
import { TableCategoriesNode } from '../../shared/interfaces/tableCategoriesNode-interface';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { SpinnerService } from '../../services/spinner-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatTree,
    MatTreeModule,
    RouterLink,
    RouterOutlet,
    MatProgressSpinnerModule,
    NgStyle,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  protected dataSource = TABLE_CATEGORIES;
  protected childrenAccessor = (node: TableCategoriesNode) => node.children ?? [];
  protected hasChild = (_: number, node: TableCategoriesNode) =>
    !!node.children && node.children.length > 0;
  protected spinnerService = inject(SpinnerService);
}
