import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  page: number;


  constructor(private Router: Router, private bookService: BookService) {
    this.page = 1;
   }

  /**
    * @description navigate to the page
    * @param page
  */
  navigate(page: string) {
    // if the beginning of the page is '/' then we remove the '/' to not have a duplicate
    if (page.charAt(0) === '/' && page.length > 1) {
      page = page.substring(1);
    }

    this.Router.navigate([page]);
  }

  /**
   * @description change the page and scroll to the top of the page
   * @param page
   */
  onPageChange(page: number) {
    this.page = page;
    this.toTheTop();
  }

  /**
   * @description scroll to the top of the page
  */
  toTheTop() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }

  /**
   * @description get property page
   * @returns property page
  */
  getPage(): number { return this.page; }

  /**
   * @description check if the device is a mobile device
   * @returns true if the device is a mobile device
  */
  isMobile(): boolean { return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); }

  /**
   * @description  change the background color depending on the state of the book
   * @param event
   */
  onStatusChange(event: any) {
    let color: string;
    if (event) {
        color = this.bookService.getBackgroundColor(event.value);
    } else {
        color = 'white';
    }

    return color;
  }

}
