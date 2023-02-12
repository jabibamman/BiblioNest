import { Component, Input, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private bookService: BookService) {
    this.books = this.bookService.getBooks()
    this.bookToRead = this.books.filter(book => book.status === 'to_read');
    this.favoriteAuthors = this.bookService.getFavoriteAuthorsByTimes();
   } 

  @Input() books;
  @Input() bookToRead;
  @Input() favoriteAuthors;

  ngOnInit(): void { }
  
}