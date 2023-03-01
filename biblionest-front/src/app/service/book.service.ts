import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

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
          title: response?.title ?? '',
          authors: response?.authors ?? [''],
          publishedDate: response?.publishedDate ?? '',
          description: response?.description ?? '',
          cover: response?.cover ?? '',
          isbn: response?.isbn ?? this.generateRandomIsbn(),
          pageCount: response?.pageCount ?? 1,
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

  async getBookAuthor(isbn: string, title: string): Promise<string> {
    const book = await this.getBook(isbn, title, '');
    return book.authors[0];
  }

  async getBookCover(
    isbn: string,
    title: string,
    author: string
  ): Promise<string> {
    const book = await this.getBook(isbn, title, author);
    return book.cover || 'default';
  }

  async getBookPageCount(
    isbn: string,
    title: string,
    author: string
  ): Promise<number> {
    const book = await this.getBook(isbn, title, author);
    return book.pageCount;
  }

  async getBookPublishedDate(
    isbn: string,
    title: string,
    author: string
  ): Promise<string> {
    const book = await this.getBook(isbn, title, author);
    return book.publishedDate;
  }

  async getBookDescription(
    isbn: string,
    title: string,
    author: string
  ): Promise<string> {
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

  books = [
    {
      isbn: '1234567890',
      title: 'Les Misérables',
      author: 'Victor Hugo',
      publishedDate: '2008',
      status: 'to_read',
      readCount: 0,
      nbPages: 200,
      description: '',
      imgUrl:
        'https://www.livredepoche.com/sites/default/files/images/livres/couv/9782253096337-001-T.jpeg',
      userId: 1,
    },
    {
      isbn: '0987654321',
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      publishedDate: '2008',
      status: 'read',
      readCount: 4,
      nbPages: 200,
      description: '',
      imgUrl: 'https://m.media-amazon.com/images/I/71lyHAf7XXL.jpg',
      userId: 1,
    },
    {
      isbn: '1231231231',
      title: 'Le Rouge et le Noir',
      author: 'Stendhal',
      publishedDate: '2008',
      status: 'reading',
      readCount: 0,
      nbPages: 200,
      description: '',
      imgUrl:
        'https://www.livredepoche.com/sites/default/files/images/livres/couv/9782253006206-001-T.jpeg',
      userId: 1,
    },
  ];

  getBooks(): {
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
  }[] {
    return this.books;
  }

  addBook(book: {
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
  }): void {
    this.books.push(book);
  }

  createBook(
    book: {
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
  ): void {
    if (file != null) {
      console.log('file : ' + file.name);
      let testData: FormData = new FormData();
      testData.append('image', file, file.name);
      this.http
        .post('http://localhost:3000/books/upload', testData)
        .subscribe((response) => {
          console.log(response);
        });
    }

    let body = book;

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    console.log(body);

    this.http
      .post('http://localhost:3000/books/addBook', body, httpOptions)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  // method to generate a random ISBN (not really unique but good enough for testing)
  generateIsbn(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
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
}
