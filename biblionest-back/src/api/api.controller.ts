import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(private apiService: ApiService) {}


    @Get('/gbook')
    async getBook(@Query() query: any) {
        if (query.title) {
            return await this.apiService.getBook('title', query.title);
        } else if (query.author) {
            return await this.apiService.getBook('author', query.author);
        } else if (query.publisher) {
            return await this.apiService.getBook('publisher', query.publisher);
        } else if (query.isbn) {
            return await this.apiService.getBook('isbn', query.isbn);
        } else {
            throw new Error('Invalid search type');
        }
    }
}