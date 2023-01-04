import {Component, Input} from '@angular/core';
import { BookComponent } from '../book/book.component';
import { BookService } from 'src/app/service/book.service';
@Component({
  selector: 'app-book-modify',
  templateUrl: './book-modify.component.html',
  styleUrls: ['./book-modify.component.css']
})
export class BookModifyComponent {
  constructor(private bookService: BookService) {
    this.books = this.bookService.getBooks();
   }  // Injection du service Book
  @Input() books;
  
}
