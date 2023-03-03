import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interface/ibook';
import { BookService } from 'src/app/service/book.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  page: number;
  itemsPerPage: number;
  previousLabel: string;
  nextLabel: string;
  searchText: string;
  books : Book[];
  allBooks : Book[];

  constructor(private Router: Router, private BookService: BookService, protected common: CommonService) {
    this.itemsPerPage = this.setNbItemsPerPage();
    this.page = common.getPage();
    this.previousLabel = 'Précédent';
    this.nextLabel = 'Suivant';
    this.books = this.BookService.getBooks();
    this.searchText = "";
    this.allBooks = this.books;   
  }

  async ngOnInit(): Promise<void> { 
    try {
      await this.BookService.setBooksArray();
      this.books = this.BookService.getBooks();
      this.allBooks = this.books;      
    } catch (error) {
      console.log(error);
    }    
  }

  /**
   * @description set the number of items per page depending on the type of device
   * @returns number of items per page depending on the type of device
   */
  private setNbItemsPerPage(): number { return this.common.isMobile() ? 4 : 9; }

  /**
   * @description filter the books by title or author
  */
  async filterBooks(): Promise<void> {
    this.books = this.allBooks.filter(book => book.title.toLowerCase().includes(this.searchText.toLowerCase()) || book.author.toLowerCase().includes(this.searchText.toLowerCase()));
  }

}
