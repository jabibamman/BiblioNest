import {Component, Input, OnInit} from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  constructor(private bookService: BookService, private userService: UserService) {
    this.books = this.bookService.getBooks();
   }  // Injection du service Book

  @Input() books;

  ngOnInit(): void {
    this.userService.navigateIfError(this.userService.isLogged());
  }
}
