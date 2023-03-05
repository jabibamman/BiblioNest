import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BookDisplayComponent } from './components/book-display/book-display.component';
import { BookModifyComponent } from './pages/book-modify/book-modify.component';
import { BookModifyDisplayComponent } from './components/book-modify-display/book-modify-display.component';
import { AddNewBookComponent } from './pages/add-new-book/add-new-book.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from './components/button/button.component';
import { ConnectionComponent } from './pages/connection/connection.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookComponent,
    InscriptionComponent,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    BookDisplayComponent,
    BookModifyComponent,
    BookModifyDisplayComponent,
    AddNewBookComponent,
    ButtonComponent,
    ConnectionComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      RouterModule,
      FontAwesomeModule,
      NgxPaginationModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
