import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Book } from '../interface/ibook';
import { Router } from '@angular/router';
import { log } from 'util';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient, private router: Router) {}

  books: Book[] = [];
  bookResponse: any;

  async getBook(isbn: string, title: string, author: string): Promise<any> {
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

    return lastValueFrom(this.http.get(url))
      .then((response: any) => {
        return {
          title: response.title,
          authors: response.authors,
          publishedDate: response.publishedDate,
          description: response.description,
          cover: response.cover,
          isbn: response.isbn,
          nbPages: response.pageCount,
        };
      })
      .catch((error) => {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('Something went wrong');
        }
      });
  }


  async getAllBooks(id:number): Promise<Book[]> {
      const books = await firstValueFrom(this.http.get('http://localhost:3000/books/getAllBooks/' + id));
      return books as Book[];
  } 
  
  // make a function call to the backend to get all books from the database and return the list of books (http://localhost:3000/books/getAllBooks)
  async getBooksAPI(id:number) : Promise<Book[]> {
     try {
      // récupérer seulement (isbn, title, author, publishedDate, status, read_count, nbPages, description, imgUrl)
       const books = await this.getAllBooks(id);
       const filteredBooks: Book[] = books.map((book: Book) => ({
        id: book.id,
        isbn: book.isbn,
        title: book.title,
        author: book.author,
        nbPages: book.nbPages,
        publishedDate: book.publishedDate,
        status: book.status,
        readCount: book.readCount,
        description: book.description,
        imgUrl: book.imgUrl,
      }));
      return filteredBooks;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async setBooksArray(id:number): Promise<void> {
    this.books = await this.getBooksAPI(id);
  }
  
  async valideIsbn(isbn: string): Promise<boolean> {
    const book = await this.getBook(isbn, '', '');
    return book.isbn === isbn;
  }
  
  generateRandomIsbn(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  getBackgroundColor(status: string): string {
    const colorMap = {
      reading: 'dodgerblue',
      read: 'darkgray',
      to_read: 'forestgreen',
    };

    return colorMap[status as keyof typeof colorMap] || 'white';
  }

  getBooks(): Book[] {
    return this.books;
  }

  addBook(book: Book): void {
    this.books.push(book);
  }

  deleteBook(id: number): void {
    this.http
      .delete('http://localhost:3000/books/delete/' + id)
      .subscribe(() => console.log('Delete successful'));
  }

  async modifyBook(isbn: string, book: Book): Promise<void> {
    this.http.patch('http://localhost:3000/books/'+isbn, book).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  async createBook(
    book: {
      id: number;
      isbn: string;
      title: string;
      author: string;
      publishedDate: string;
      status: string;
      readCount: number;
      nbPages: number;
      description: string;
      imgUrl: string;
      userId: number;
    },
    file: File
  ): Promise<void> {
    let body = book;

    if (file != null) {
      console.log('file : ' + file.name);

      let testData: FormData = new FormData();

      testData.append('image', file, file.name);
      this.http.post('http://localhost:3000/uploads/upload', testData).subscribe({
        next: async (data) => {
          // @ts-ignore
          console.log(data.originalname);
          // @ts-ignore
          body.imgUrl = data.originalname;

          let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
          };

          this.fetchAddBook(book, body, httpOptions);
        },
      });
    } else {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

      this.fetchAddBook(book, body, httpOptions);
    }
  }

  // return the list of authors, if an author is duplicated, it will be returned only once and it will be the first occurence
  getFavoriteAuthorsByTimes(): { name: string; times: number }[] {
    // get all authors from books
    const authors = this.books.map((book) => book.author);

    // create an array of unique authors with their count
    const authorsWithCounts = Array.from(new Set(authors)).map((name) => ({
      name,
      times: authors.filter((author) => author === name).length,
    }));

    // sort the authors by most popular to least
    return authorsWithCounts.sort((a, b) => b.times - a.times);
  }

  async fetchAddBook(book: Book, body: any, httpOptions: any): Promise<void> {
    try {
      const response = this.http
        .post('http://localhost:3000/books/addBook', body, httpOptions)
        .subscribe(
          (response) => {
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error(error);
          }
        );
    } catch (error) {
      console.error(error);
    }
  }
}
