import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Res,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksDto } from "./dto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as path from "path";
import { writeFile } from "fs";
import { Observable } from "rxjs";
import { join } from "path";
import { Response } from 'express';

@Controller("books")
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post("addBook")
  signup(@Body() dto: BooksDto) {
    return this.booksService.createBook(dto);
  }


    @Get("getAllBooks")
    async getBooks() {        
        return this.booksService.getBooks();
    }

    @Get("getAllBooksUser")
        // this is an example of a postman request : 127.0.0.1:3000/books/getAllBooksUser {"userId": 1}
    async getBooksUserById(@Body() body) {
        return this.booksService.getBooksUser(body);
    }
}