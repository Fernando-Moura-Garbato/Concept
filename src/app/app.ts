import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Book } from '../components/home/home';
import {Nav} from '../layout/nav/nav'

declare global {
  interface Window {
    list: { books: () => Promise<Array<Book>> },
    currentWindow: { 
      close: () => Promise<boolean>
      minimize: () => Promise<boolean>
      maximize: () => Promise<boolean>
    }
  }
}

@Component({
  imports: [RouterOutlet, Nav],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Concept');
  protected readonly isBookOpen = signal(false);


}
