import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  getBackgroundColor(status: string): string {
    if (status === 'reading') {
      return 'dodgerblue';
    } else if (status === 'read') {
      return 'darkgray';
    } else if (status === 'to_read') {
      return 'forestgreen';
    }
    return 'white';
  }

  books = [
    { isbn: '1234567890', title: 'Les Misérables', author: 'Victor Hugo', status: 'to_read', read_count:0, nb_pages:200, img_url:'https://www.livredepoche.com/sites/default/files/images/livres/couv/9782253096337-001-T.jpeg' },
    { isbn: '0987654321', title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', status: 'read', read_count:4, nb_pages:200, img_url:'https://m.media-amazon.com/images/I/71lyHAf7XXL.jpg' },
    { isbn: '1231231231', title: 'Le Rouge et le Noir', author: 'Stendhal', status: 'reading', read_count:0, nb_pages:200, img_url:'https://www.livredepoche.com/sites/default/files/images/livres/couv/9782253006206-001-T.jpeg' }
  ];

  getBooks() {
    return this.books;
  }

}