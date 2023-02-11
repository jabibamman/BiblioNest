import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }

  async getBook(isbn:string, title: string, author: string): Promise<any> {
    let url = 'http://localhost:3000/api/gbook?';

    if (isbn) {
      url += 'isbn=' + isbn;
    } else if (title) {
      url += 'title=' + title;
    } else if (author) {
      url += 'author=' + author;
    } else {
      throw new Error('Invalid search type');
    }

    return lastValueFrom(this.http.get(url)).then((response: any) => {
      return {
        title: response.title,
        authors: response.authors,
        publishedDate: response.publishedDate,
        description: response.description,
        cover: response.cover,
        isbn: response.isbn,
        pageCount: response.pageCount,
      };
    }).catch((error) => {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {  
            throw new Error("Something went wrong");
        }  
    });
  }

  async getBookAuthor(isbn: string, title: string): Promise<string> {
    const book = await this.getBook(isbn, title, '');
    return book.authors[0];
  }

  async getBookCover(isbn: string,title: string, author: string): Promise<string> {
    const book = await this.getBook(isbn, title, author);
    return book.cover || 'default';
  }

  async getBookPageCount(isbn: string, title: string, author: string): Promise<number> {
    const book = await this.getBook(isbn, title, author);
    return book.pageCount;
  }

  async getBookPublishedDate(isbn: string, title: string, author: string): Promise<string> {
    const book = await this.getBook(isbn, title, author);
    return book.publishedDate;
  }

  async getBookDescription(isbn: string, title: string, author: string): Promise<string> {
    const book = await this.getBook(isbn, title, author);
    return book.description;
  }
  
  async valideIsbn(isbn: string): Promise<boolean> {
    const book = await this.getBook(isbn, '', '');
    return book.isbn === isbn;
  }

  async getISBNBook(title: string, author: string): Promise<string> {
    const book = await this.getBook('', title, author);  
    return book.isbn;
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
    { isbn: '1234567890', title: 'Les Misérables', author: 'Victor Hugo', publishedDate:'2008', status: 'to_read', read_count:0, nb_pages:200, description:'', img_url:'https://www.livredepoche.com/sites/default/files/images/livres/couv/9782253096337-001-T.jpeg' },
    { isbn: '0987654321', title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', publishedDate:'2008', status: 'read', read_count:4, nb_pages:200, description:'', img_url:'https://m.media-amazon.com/images/I/71lyHAf7XXL.jpg' },
    { isbn: '1231231231', title: 'Le Rouge et le Noir', author: 'Stendhal', publishedDate:'2008', status: 'reading', read_count:0, nb_pages:200, description:'', img_url:'https://www.livredepoche.com/sites/default/files/images/livres/couv/9782253006206-001-T.jpeg' }
  ];

  getBooks(): { isbn: string; title: string; author: string; status: string; read_count: number; nb_pages: number; img_url: string; }[] {
    return this.books;
  }

  addBook(book: { isbn: string; title: string; author: string; publishedDate: string; status: string; read_count: number; nb_pages: number; description: string, img_url: string; }): void {
    this.books.push(book); 
  }

  // method to generate a random ISBN (not really unique but good enough for testing)
  generateIsbn(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}