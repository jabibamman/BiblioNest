import { HttpService } from "@nestjs/axios";
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ApiService {
  api_url = "https://www.googleapis.com/books/v1/volumes?q=";

  searchTypes = {
    isbn: "isbn:",
    title: "",
    author: "inauthor:",
    publisher: "inpublisher:",
  };

  constructor(private http: HttpService) {}

  @HttpCode(200)
  async getGbook(searchType: string, searchValue: string) {
    try {
      let url = this.api_url;
      switch (searchType) {
        case "isbn":
          url += this.searchTypes.isbn + searchValue;
          break;
        case "title":
          url += searchValue;
          break;
        case "author":
          url += this.searchTypes.author + searchValue;
          break;
        case "publisher":
          url += this.searchTypes.publisher + searchValue;
          break;
        default:
          throw new HttpException(
            {
              status: HttpStatus.BAD_GATEWAY,
              error: "Invalid search type",
            },
            HttpStatus.BAD_GATEWAY
          );
      }

      const get$ = this.http.get(url);
      const { data } = await lastValueFrom(get$);
      if (data.totalItems === 0) {
        throw new HttpException(
          {
            status: HttpStatus.NO_CONTENT,
            message: "No content",
          },
          HttpStatus.NO_CONTENT
        );
      }
      const book = data.items[0].volumeInfo;
      return {
        title: book.title,
        authors: book.authors,
        publishedDate: book.publishedDate,
        description: book.description,
        cover: (book.imageLinks && book.imageLinks.thumbnail) || "default",
        isbn: book.industryIdentifiers[0].identifier,
        pageCount: book.pageCount,
      };
    } catch (error) {
      switch (error.getStatus()) {
        case error.response.error === "Invalid search type":
          throw error;
        case HttpStatus.NO_CONTENT:
          throw error;
        default:
          throw new HttpException(
            {
              status: HttpStatus.BAD_GATEWAY,
              error: "Bad gateway",
            },
            HttpStatus.BAD_GATEWAY
          );
      }
    }
  }

  async getBookByTitle(title: string) {
    try {
      const url = this.api_url + title;
      const get$ = this.http.get(url);
      const { data } = await lastValueFrom(get$);
      if (data.totalItems === 0) {
        throw new HttpException(
          {
            status: HttpStatus.NO_CONTENT,
            message: "No content",
          },
          HttpStatus.NO_CONTENT
        );
      }
      const book = data.items[0].volumeInfo;
      return {
        title: book.title,
        authors: book.authors,
        publishedDate: book.publishedDate,
        description: book.description,
        imgUrl: (book.imageLinks && book.imageLinks.thumbnail) || "default",
        isbn: book.industryIdentifiers[0].identifier,
        nbPages: book.pageCount,
      };
    } catch (error) {
      switch (error.getStatus()) {
        case HttpStatus.NO_CONTENT:
          throw error;
        default:
          throw new HttpException(
            {
              status: HttpStatus.BAD_GATEWAY,
              error: "Bad gateway",
            },
            HttpStatus.BAD_GATEWAY
          );
      }
    }
  }
}
