import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }

  async getBookCover(title: string, author: string, publishedDate: string): Promise<string> {
    let url = 'http://localhost:3000/api/book/title/' + title;
    return lastValueFrom(this.http.get(url)).then((response: any) => {
        if (response.authors[0].toLowerCase() === author.toLowerCase() && response.publishedDate === publishedDate) {
          console.log(response.cover);
            
          return response.cover || 'default';
        } else {
            return 'default';
        }
    }
    ).catch((error) => {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {  
            throw new Error("Something went wrong");
        }  
    });
  }

  getBackgroundColor(status: string): string {
    const colorMap = {
      reading: 'dodgerblue',
      read: 'darkgray',
      to_read: 'forestgreen',
    }
    
    return colorMap[status as keyof typeof colorMap] || 'white';
  }

  books = [
    { isbn: '1234567890', title: 'Les Misérables', author: 'Victor Hugo', publishedDate:'2008', status: 'to_read', read_count:0, nb_pages:200, img_url:'https://www.livredepoche.com/sites/default/files/images/livres/couv/9782253096337-001-T.jpeg' },
    { isbn: '0987654321', title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', publishedDate:'2008', status: 'read', read_count:4, nb_pages:200, img_url:'https://m.media-amazon.com/images/I/71lyHAf7XXL.jpg' },
    { isbn: '1231231231', title: 'Le Rouge et le Noir', author: 'Stendhal', publishedDate:'2008', status: 'reading', read_count:0, nb_pages:200, img_url:'https://www.livredepoche.com/sites/default/files/images/livres/couv/9782253006206-001-T.jpeg' }
  ];

  getBooks(): { isbn: string; title: string; author: string; status: string; read_count: number; nb_pages: number; img_url: string; }[] {
    return this.books;
  }

  addBook(book: { isbn: string; title: string; author: string; publishedDate: string; status: string; read_count: number; nb_pages: number; img_url: string; }): void {
    this.books.push(book); 
  }

  // method to generate a random ISBN (not really unique but good enough for testing)
  generateIsbn(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}