import { Component, OnInit, signal } from '@angular/core';

export class Book {
  id : number = 0;
  title: string = "";
  section: string = "";
}



@Component({
    imports: [],
    selector: 'app-home',
    styleUrl: './home.css',
    templateUrl: './home.html',
})
export class Home implements OnInit {
    books = signal<Array<Book>>([]);
    async ngOnInit(): Promise<void> {
        this.books.set(await window.list.books());
        console.log(this.books());
    }
}
