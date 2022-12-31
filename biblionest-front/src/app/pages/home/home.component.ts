import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  books = [
    { isbn: '1234567890', title: 'Les Misérables', author: 'Victor Hugo', status: 'to_read', read_count:0, nb_pages:200, img_url:'https://www.livredepoche.com/sites/default/files/images/livres/couv/9782253096337-001-T.jpeg' },
    { isbn: '0987654321', title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', status: 'read', read_count:4, nb_pages:200, img_url:'https://m.media-amazon.com/images/I/71lyHAf7XXL.jpg' },
    { isbn: '1231231231', title: 'Le Rouge et le Noir', author: 'Stendhal', status: 'reading', read_count:0, nb_pages:200, img_url:'https://www.livredepoche.com/sites/default/files/images/livres/couv/9782253006206-001-T.jpeg' }
  ];


  constructor(private Router: Router) { 
    this.itemsPerPage = this.setNbItemsPerPage();
    this.page = 1;
    this.previousLabel = 'Précédent';
    this.nextLabel = 'Suivant';
  }

  ngOnInit(): void { }

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
}
