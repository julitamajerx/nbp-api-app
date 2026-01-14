import { Component, signal } from '@angular/core';
import { Sidebar } from '../core/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('nbp-api-app');
}
