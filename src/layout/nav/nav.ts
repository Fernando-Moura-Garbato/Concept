import { Component, signal, inject } from '@angular/core';
import { ContentService } from '../../services/content-service';

@Component({
    imports: [],
    selector: 'app-nav',
    styleUrl: './nav.css',
    templateUrl: './nav.html',
})
export class Nav {
    content = inject(ContentService);

    
    closeWindow(){
        window.currentWindow.close();
    }
    maximizeWindow(){
        window.currentWindow.maximize();
    }    
    minimizeWindow(){
        window.currentWindow.minimize();
    }
}
