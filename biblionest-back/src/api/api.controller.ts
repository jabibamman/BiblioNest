import { Controller, Get, HttpException, HttpStatus, Logger, Param, Query } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(private apiService: ApiService, private readonly logger: Logger) {}


    @Get('/gbook')
    async getGBooks(@Query() query: any) {
      let searchType, searchTerm;
      if (query.title) {
        searchType = 'title';
        searchTerm = query.title;
      } else if (query.author) {
        searchType = 'author';
        searchTerm = query.author;
      } else if (query.publisher) {
        searchType = 'publisher';
        searchTerm = query.publisher;
      } else if (query.isbn) {
        searchType = 'isbn';
        searchTerm = query.isbn;
      } else {
        const error = {
          status: HttpStatus.BAD_GATEWAY,
          error: 'Invalid search type',
          message: 'Please provide a valid search type',
        };
        this.logger.error(`${this.getGBooks.name[0].toUpperCase()}${this.getGBooks.name.slice(1)} - ${error.message}`, `${this.constructor.name}`);
        throw new HttpException(error, HttpStatus.BAD_GATEWAY);
      }
  
      const result = await this.searchBooks(searchType, searchTerm);
      this.logger.log(`${this.getGBooks.name[0].toUpperCase()}${this.getGBooks.name.slice(1)} - search by ${searchType}: '${searchTerm}'`, `${this.constructor.name}`);
      return result;
    }
  
    async searchBooks(searchType: string, searchTerm: string) {
      return await this.apiService.getGbook(searchType, searchTerm);
    }
}