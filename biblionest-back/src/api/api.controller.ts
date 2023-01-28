import { Controller, Get, Param } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(private apiService: ApiService) {}

    @Get("book/isbn/:isbn")
    getBookByISBN(@Param('isbn') isbn: string) {
        return this.apiService.getBookByISBN(isbn);
    }

    @Get("book/title/:title")
    getBookByTitle(@Param('title') title: string) {
        return this.apiService.getBookByTitle(title);
    }

}
