import { Component, OnInit, signal, inject} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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
    private router = inject(Router);
    books = signal<Array<Book>>([]);

    async ngOnInit(): Promise<void> {
        this.books.set(await window.list.books());
    }

    BookSelected(book: Book) {
        this.router.navigateByUrl('/book/' + book.id);
    }
}
