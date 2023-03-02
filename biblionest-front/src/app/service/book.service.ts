import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Book } from '../interface/ibook';
import { catchError, firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }

  books: Book[] = [];

  async ngOnInit() {} 

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
        nbPages: response.pageCount,
      };
    }).catch((error) => {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {  
            throw new Error("Something went wrong");
        }  
    });
  }


  async getAllBooks(): Promise<Book[]> {
      const books = await firstValueFrom(this.http.get('http://localhost:3000/books/getAllBooks'));
      return books as Book[];
  }
  
  
  // make a function call to the backend to get all books from the database and return the list of books (http://localhost:3000/books/getAllBooks)
  async getBooksAPI() : Promise<Book[]> {
     try {
      // récupérer seulement (isbn, title, author, publishedDate, status, read_count, nb_pages, description, img_url)
       const books = await this.getAllBooks();
       const filteredBooks = books.map((book: Book) => ({
          isbn: book.isbn,
          title: book.title,
          author: book.author,
          publishedDate: book.publishedDate,
          status: book.status,
          readCount: book.readCount,
          nbPages: book.nbPages,
          description: book.description,
          img_url: book.img_url
       }));
        console.log(filteredBooks);
       return filteredBooks as Book[];
     } catch (error) {
        console.log(error);
        return [];
      }   
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

  getBooks(): Book[] {
    return this.books;
  }
   
  addBook(book: Book): void {
    this.books.push(book); 
  }

  // method to generate a random ISBN (not really unique but good enough for testing)
  generateIsbn(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // return the list of authors, if an author is duplicated, it will be returned only once and it will be the first occurence
  getFavoriteAuthorsByTimes(): {name: string, times: number}[] {
    // get all authors from books
    const authors = this.books.map(book => book.author);

    // create an array of unique authors with their count
    const authorsWithCounts = Array.from(new Set(authors)).map(name => ({
      name,
      times: authors.filter(author => author === name).length
    }));

    // sort the authors by most popular to least
    return authorsWithCounts.sort((a, b) => b.times - a.times);
  }
}