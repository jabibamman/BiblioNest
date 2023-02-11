import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  api_url = 'https://www.googleapis.com/books/v1/volumes?q=';

  searchTypes = {
    "isbn": "isbn:",
    "title": "",
    "author": "inauthor:",
    "publisher": "inpublisher:",
  }

  constructor(private http: HttpService) { }

  async getGbook(searchType: string, searchValue: string) {
    try {
      let url = this.api_url;      
      switch (searchType) {
        case 'isbn':
          url += this.searchTypes.isbn + searchValue;
          break;
        case 'title':
          url += searchValue;
          break;
        case 'author':
          url += this.searchTypes.author + searchValue;
          break;
        case 'publisher':
          url += this.searchTypes.publisher + searchValue;
          break;
        default:
          throw new Error('Invalid search type');
      }

      const get$ = this.http.get(url);
      const { data } = await lastValueFrom(get$);
      if (data.totalItems === 0) {
        throw new Error('Invalid search value');
      }
      const book = data.items[0].volumeInfo;
      return {
        title: book.title,
        authors: book.authors,
        publishedDate: book.publishedDate,
        description: book.description,
        cover: (book.imageLinks && book.imageLinks.thumbnail) || 'default',
        isbn: book.industryIdentifiers[0].identifier,
        pageCount: book.pageCount,
      };
    } catch (error) {
      throw new Error(error.message);
    }
    
  }

}