import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  books: { isbn: string; title: string; author: string; status: string; read_count: number; nb_pages: number; img_url: string; }[];

  constructor(private Router: Router, private BookService: BookService, protected common: CommonService) {
    this.itemsPerPage = this.setNbItemsPerPage();
    this.page = common.getPage();
    this.previousLabel = 'Précédent';
    this.nextLabel = 'Suivant';
    this.books = this.BookService.getBooks();
  }

  ngOnInit(): void { }

  /**
   * @description set the number of items per page depending on the type of device
   * @returns number of items per page depending on the type of device
   */
  private setNbItemsPerPage(): number { return this.common.isMobile() ? 4 : 9; }


}
