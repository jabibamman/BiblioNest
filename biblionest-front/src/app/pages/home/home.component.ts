import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/service/book.service';

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
  books: { isbn: string; title: string; author: string; status: string; read_count: number; nb_pages: number; img_url: string; }[];
  allBooks: { isbn: string; title: string; author: string; status: string; read_count: number; nb_pages: number; img_url: string; }[];

  constructor(private Router: Router, private BookService: BookService) {
    this.itemsPerPage = this.setNbItemsPerPage();
    this.page = 1;
    this.previousLabel = 'Précédent';
    this.nextLabel = 'Suivant';
    this.books = this.BookService.getBooks();
    this.searchText = '';
    this.allBooks = this.books; 
  }

  ngOnInit(): void { 
    this.allBooks
  }

 /**
  * @description navigate to the page
  * @param page 
  */
  navigate(page: string) {
    this.Router.navigate([page]);     
  }

  /**
   * @description change the page and scroll to the top of the page
   * @param page 
   */
  onPageChange(page: number) {
    this.page = page;
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }

  /**
   * @description set the number of items per page depending on the type of device
   * @returns number of items per page depending on the type of device
   */
  private setNbItemsPerPage(): number { return this.isMobile ? 4 : 9; }

  /**
   * @description check if the device is a mobile device
   * @returns true if the device is a mobile device
   */
  private get isMobile(): boolean { return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); }

  /**
   * @description filter the books by title or author
  */
  filterBooks() {
    this.books = this.allBooks.filter(book => book.title.toLowerCase().includes(this.searchText.toLowerCase()) || book.author.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}
