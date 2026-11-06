import { Component, OnInit, signal, inject} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ContentService } from '../../services/content-service';
import { Book } from '../../entities/book';

@Component({
    imports: [],
    selector: 'app-home',
    styleUrl: './home.css',
    templateUrl: './home.html',
})
export class Home implements OnInit {
    private router = inject(Router);
    content = inject(ContentService);
    books = signal<Array<Book>>([]);

    async ngOnInit(): Promise<void> {
        this.books.set(await window.list.books());
    }

    BookSelected(book: Book) {
        this.router.navigateByUrl('/book/' + book.id);
        this.content.books.set([...this.content.books(), book]);
        this.content.currentBook.set(book.id);
    }
}
