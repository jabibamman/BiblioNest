import { Component, Input } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { UserService } from "../../service/user.service";
import { CommonService } from "../../service/common.service";

@Component({
  selector: 'app-book-modify',
  templateUrl: './book-modify.component.html',
  styleUrls: ['./book-modify.component.css']
})
export class BookModifyComponent {
  constructor(private bookService: BookService, private userService: UserService, private common:CommonService) {
    this.books = this.bookService.getBooks();
   }  // Injection du service Book
  @Input() books;

  ngOnInit(): void {
    this.userService.navigateIfError(this.userService.isLogged());
  }
}
