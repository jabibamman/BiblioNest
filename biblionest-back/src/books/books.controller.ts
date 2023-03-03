import { Body, Controller, Get, Post } from "@nestjs/common";
import { BooksService } from "./books.service";
//import { BooksDto } from "./dto";

@Controller("books")
export class BooksController {
  constructor(private booksService: BooksService) {}

    @Get("getAllBooks")
    async getBooks() {        
        return this.booksService.getBooks();
    }

    @Get("getAllBooksUser")
    async getBooksUserById(@Body() body) {
        // this is an example of a postman request : 127.0.0.1:3000/books/getAllBooksUser {"userId": 1}
        return this.booksService.getBooksUser(body);
    }
}
