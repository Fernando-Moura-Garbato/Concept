import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Book } from '../components/home/home';

declare global {
  interface Window {
    list: { books: () => Promise<Array<Book>> }
  }
}

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Concept');
}
