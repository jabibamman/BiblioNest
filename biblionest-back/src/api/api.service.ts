import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
    api_url = 'https://www.googleapis.com/books/v1/volumes?q=';

    constructor(private http: HttpService) {}
    
    async getBookByISBN(isbn: string) {
      try {
        const url = this.api_url + "isbn:" + isbn;
        const get$ = this.http.get(url);
        const { data } = await lastValueFrom(get$);
        if (data.totalItems === 0) {
          throw new Error('Invalid ISBN');
        }
        const book = data.items[0].volumeInfo;

        return {
          title: book.title,
          authors: book.authors,
          publishedDate: book.publishedDate,
          description: book.description,
          cover: (book.imageLinks && book.imageLinks.thumbnail) || 'default',
          isbn: book.industryIdentifiers[0].identifier
        };
      } catch (error) {
        throw new Error(error.message);
      }
    }
    

    async getBookByTitle(title: string) {
      try {
        const url = this.api_url + title;
        const get$ = this.http.get(url);
        const { data } = await lastValueFrom(get$);
        if (data.totalItems === 0) {
          throw new Error('Invalid title');
        }
        const book = data.items[0].volumeInfo;
        return {
          title: book.title,
          authors: book.authors,
          publishedDate: book.publishedDate,
          description: book.description,
          cover: (book.imageLinks && book.imageLinks.thumbnail) || 'default',
          isbn: book.industryIdentifiers[0].identifier
        };
      } catch (error) {
        throw new Error(error.message);
      }
    }

    async getBookByAuthor(author: string) {
      try {
        const url = this.api_url + "inauthor:" + author;
        const get$ = this.http.get(url);
        const { data } = await lastValueFrom(get$);
        if (data.totalItems === 0) {
          throw new Error('Invalid author');
        }
        const book = data.items[0].volumeInfo;
        return {
          title: book.title,
          authors: book.authors,
          publishedDate: book.publishedDate,
          description: book.description,
          cover: (book.imageLinks && book.imageLinks.thumbnail) || 'default',
          isbn: book.industryIdentifiers[0].identifier
        };
      } catch (error) {
        throw new Error(error.message);
      }
    }

}
