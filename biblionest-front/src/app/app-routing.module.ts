import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {BookComponent} from "./pages/book/book.component";
import {InscriptionComponent} from "./pages/inscription/inscription.component";
import {ConnectionComponent} from "./pages/connection/connection.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {BookModifyComponent} from "./pages/book-modify/book-modify.component";
import {AddNewBookComponent} from "./pages/add-new-book/add-new-book.component";

const routes: Routes = [
  {
    path: '',
    component: ConnectionComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'book/:isbn',
    component: BookComponent,
  },
  {
    path: 'modify_book/:isbn',
    component: BookModifyComponent,
  },
  {
    path: 'add_book',
    component: AddNewBookComponent,
  },
  {
    path: 'inscription',
    component: InscriptionComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
