import { Service, signal } from '@angular/core';
import { Book, Item } from '../entities/book';

@Service()
export class ContentService {
    books = signal<Array<Book>>([]);
    bookTabs = signal<Record<number, number>>({}); // book and category id
    currentBook = signal<number>(0);

    async getCurrentCategoryContent():  Promise<{ categories: Array<Item>; concepts: Array<Item>; }> {
        const bookId = this.currentBook();
        return await window.list.root(bookId);
    }
}
