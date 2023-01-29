import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(private apiService: ApiService) {}


    @Get('/book')
    async getBook(@Query() query: any) {
        let book;
        
        if (query.title) {
            book = await this.apiService.getBook('title', query.title);
        } else if (query.author) {
            book = await this.apiService.getBook('author', query.author);
        } else if (query.publisher) {
            book = await this.apiService.getBook('publisher', query.publisher);
        } else if (query.isbn) {
            book = await this.apiService.getBook('isbn', query.isbn);
        } else {
            throw new Error('Invalid search type');
        }

        return book;
    }
}

