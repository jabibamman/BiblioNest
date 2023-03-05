import { Component, Input, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import {UserService} from "../../service/user.service";
import {CommonService} from "../../service/common.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private bookService: BookService, private userService: UserService, private common: CommonService) {
    this.books = this.bookService.getBooks()
    this.bookToRead = this.books.filter(book => book.status === 'to_read');
    this.favoriteAuthors = this.bookService.getFavoriteAuthorsByTimes();
  }

  @Input() books;
  @Input() bookToRead;
  @Input() favoriteAuthors;
  user: any;

  async ngOnInit(): Promise<void> {
    this.userService.isLogged().subscribe(
      (response: any) => {
        this.user = response;
      },
      (error:any) => {
        console.error(error);
        this.common.navigate('');
      }
    );
  }
}
