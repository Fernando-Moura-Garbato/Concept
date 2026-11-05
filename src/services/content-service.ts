import { Service, signal } from '@angular/core';

@Service()
export class ContentService {
    tabs = signal<Array<string>>([]);
}
