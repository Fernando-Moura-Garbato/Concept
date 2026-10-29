import { Routes } from '@angular/router';
import { Home } from '../components/home/home';
import { AppBook } from '../components/book/book';


export const routes: Routes = [
    {path: '', component: Home },
    {path: 'book/:id', component: AppBook}
];
