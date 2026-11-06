import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../services/content-service';
import { Nav } from '../../layout/nav/nav';

@Component({
    imports: [Nav],
    selector: 'app-book',
    styleUrl: './book.css',
    templateUrl: './book.html',
})
export class AppBook implements OnInit {
    content = inject(ContentService);
    currentCategoryContent: any;

    async ngOnInit(): Promise<void> {
        this.currentCategoryContent = await this.content.getCurrentCategoryContent();
    }


}
