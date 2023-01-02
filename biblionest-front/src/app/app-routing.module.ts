import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {BookComponent} from "./pages/book/book.component";
import {AuthentificationComponent} from "./pages/authentification/authentification.component";
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'book/:isbn',
    component: BookComponent,
  },
  {
    path: 'modify_book/:isbn',
    component: BookComponent,
  },
  {
    path: 'authentification',
    component: AuthentificationComponent,
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
