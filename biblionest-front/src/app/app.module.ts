import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from "@angular/router";
import { BookComponent } from './pages/book/book.component';
import { AuthentificationComponent } from './pages/authentification/authentification.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { BookDisplayComponent } from './components/book-display/book-display.component';
import { BookModifyComponent } from './pages/book-modify/book-modify.component';
import { BookModifyDisplayComponent } from './components/book-modify-display/book-modify-display.component';
import { AddNewBookComponent } from './pages/add-new-book/add-new-book.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookComponent,
    AuthentificationComponent,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    BookDisplayComponent,
    BookModifyComponent,
    BookModifyDisplayComponent,
    AddNewBookComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        FontAwesomeModule,
        NgxPaginationModule,
        ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
